const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .populate('category')
    .exec((error, records) => {
      if (error) {
        res.send(error)
        console.error(error, error.stack)
      }
      records.forEach((record) => {
        record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD')
      })
      res.render('index', { records, months, years, currentYear })
    })
})

module.exports = router
