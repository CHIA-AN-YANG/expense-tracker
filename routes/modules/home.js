const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');
const moment = require('moment');

// render homepage listing
router.get('/', (req, res) => {
//generate year & months
  const d = new Date()
  const startYr = 2000
  const currentYear = Number(d.getFullYear())
  const endYr = currentYear+2
  const months = [...Array(12).keys()]
  const years = Array.from({length:(endYr-startYr-1)}, (_, i) => startYr+i)
  const userId = req.user._id
  Record.find({ userId })
  .lean()
  .populate('category')
  .exec((err, records) => {
    if(err){return handleError(err)}
    records.forEach(record => { record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD') })
    res.render('index', { records, months, years, currentYear})    
  })
});


module.exports = router;