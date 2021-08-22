const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const flash = require('connect-flash')
const moment = require('moment')
const { currentYear, months, years } = require('./util')
const category = require('../../models/category')

// Create a new record
router.get('/new', (_, res) => {
  const dateSet = moment(new Date()).format('YYYY[-]MM[-]DD')
  return Category.find({}, 'name')
    .lean()
    .then((categories) => {
      console.log(categories)
      return res.render('new', { today: dateSet, category: categories })
    })
})
router.post('/', (req, res) => {
  const userId = req.user._id
  let { name, date, categoryId, merchant, amount } = req.body
  categoryId = Number(categoryId)
  return Category.findOne({ categoryId }, function (_, category) {
    let cateObjId = category._id
    Record.create({ userId, name, amount, date, merchant, category: cateObjId })
  })
    .then(() => res.redirect('/'))
    .catch((error) => {
      res.send(error)
      console.error(error, error.stack)
    })
})

// Edit a Record
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .populate('category')
    .exec((error, record) => {
      if (error) {
        res.send(error)
        console.error(error, error.stack)
      }
      record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD')
      return Category.find()
        .lean()
        .then((categories) => {
          categories.forEach((category) => {
            if (record.category.categoryId == category.categoryId) {
              category.isActive = true
            }
          })
          res.render('edit', { record, categories })
        })
    })
})
// Revise a Record
router.put('/:id', (req, res) => {
  const id = req.params.id
  let { name, date, categoryId, merchant, amount } = req.body
  let cateObjId
  categoryId = Number(categoryId)
  return Category.findOne({ categoryId }).then((category) => {
    cateObjId = category._id
    Record.findById(id)
      .then((record) => {
        record.name = name
        record.category = cateObjId
        record.amount = amount
        record.merchant = merchant
        record.date = date
        record.save()
      })
      .then(() => res.redirect('/'))
      .catch((error) => {
        console.error(error, error.stack)
        return res.send(error)
      })
  })
})

// Delete a Record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then((data) => data.remove())
    .then(() => res.redirect('/'))
    .catch((error) => {
      alert(error)
      console.error(error, error.stack)
    })
})

// Filter by Category and month
router.get('/filter', (req, res) => {
  const keyword = req.query.keyword + ''
  const selectedYear = req.query.pickyear
  const selectedMonth = req.query.pickmonth
  const userId = req.user._id

  const filter = function (id, cate, start, end) {
    let selectedCategory = false
    console.log('cate:', cate)
    async function getAsyncCategory() {
      let categoryPromise = new Promise((resolve, reject) => {
        Category.findOne({ categoryId: cate })
          .lean()
          .then((category) => {
            query = {
              date: { $gte: start, $lt: end },
              userId: id,
              category: category._id,
            }
            return category
          })
          .then((category) => {
            resolve(category)
          })
      })
      selectedCategory = await categoryPromise
    }
    if (cate) getAsyncCategory()
    else query = { date: { $gte: start, $lt: end }, userId: id }

    Record.find(query)
      .populate({ path: 'category' })
      .lean()
      .exec((error, records) => {
        if (error) {
          console.error(error, error.stack)
          req.flash('error_msg', '無法過濾，有些東西壞掉了 Oops!')
          return res.redirect('/')
        }
        records.forEach((record) => {
          record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD')
        })
        return res.render('index', {
          records,
          years,
          months,
          currentYear,
          selectedYear,
          selectedMonth,
          selectedCategory,
        })
      })
  }
  if (!(keyword || selectedMonth)) {
    req.flash('error_msg', '類別與月份至少要選一個。')
  }
  if (!selectedMonth) {
    filter(userId, keyword, '1970-1-1', '2040-12-31')
  } else {
    let monthNext = Number(selectedMonth) + 1 //ISO Dates formate
    let dstart = new Date(
      `${selectedYear}-${
        selectedMonth > 9 ? selectedMonth : '0' + selectedMonth
      }-01`
    )
    let dtemp = new Date(
      `${selectedYear}-${monthNext > 9 ? monthNext : '0' + monthNext}-01`
    )
    let dend = new Date(dtemp.setDate(dtemp.getDate() - 1))
    filter(userId, keyword, dstart, dend)
  }
})

module.exports = router
