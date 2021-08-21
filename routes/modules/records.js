const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const flash = require('connect-flash')
const moment = require('moment')
const { currentYear, months, years } = require('/util')

// Create a new record
router.get('/new', (_, res) => {
  const dateSet = moment(new Date()).format('YYYY[-]MM[-]DD')
  return Category.find()
    .lean()
    .then((docs) => {
      res.render('new', { today: dateSet, category: docs })
    })
})
router.post('/', (_, res) => {
  const userId = req.user._id
  let { name, date, categoryId, merchant, amount } = req.body
  categoryId = Number(categoryId)
  return Category.findOne({ categoryId: categoryId }, function (_, category) {
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
  const year = req.query.pickyear
  const month = req.query.pickmonth
  const userId = req.user._id
  const filter = function (id, cate, start, end) {
    let filteredData = []
    console.log(`finding record...start: ${start} end: ${end}`)
    Record.find({ userId: id, date: { $gte: start, $lt: end } })
      .lean()
      .populate('category')
      .exec((error, categories) => {
        if (error) {
          console.error(error, error.stack)
          return res.send(error)
        }
        categories.forEach((category) => {
          category.momentDate = moment(category.date).format('YYYY[-]MM[-]DD')
        })
        if (cate) {
          filteredData = categories.filter((el) => {
            return el.category.categoryId == Number(cate)
          })
        } else {
          filteredData = categories
        }

        console.log(`filteredData: ${filteredData}`)
        return res.render('index', {
          records: filteredData,
          currentYear,
          months,
          years,
        })
      })
  }
  if (!(keyword || month)) {
    req.flash('error_msg', '類別與月份至少要選一個。')
  }
  if (!month) {
    filter(userId, keyword, '1970-1-1', '2040-12-31')
  } else {
    let monthNext = Number(month) + 1 //ISO Dates formate
    let dstart = new Date(`${year}-${month > 9 ? month : '0' + month}-01`)
    let dtemp = new Date(
      `${year}-${monthNext > 9 ? monthNext : '0' + monthNext}-01`
    )
    let dend = new Date(dtemp.setDate(dtemp.getDate() - 1))
    filter(userId, keyword, dstart, dend)
  }
})

//Delete all data in Records
router.get('/destroy', (_, res) => {
  return Record.deleteMany({}, () => {
    console.log('All record documents have been removed.')
    res.redirect('/')
  }).catch((error) => {
    console.error(error, error.stack)
    return res.send(error)
  })
})

module.exports = router
