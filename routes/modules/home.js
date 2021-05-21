const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');
const moment = require('moment');



/* for test only */
router.get('/test', (req, res) => {
  Record.findOne({'name': 'Bibi'})
  .populate({path:'category', select:'name'})
  .exec((err, doc) =>{ if (err) return handleError("test "+ error)
    console.log("doc: "+doc)

  } )
});

/* GET users listing. */
router.get('/', (req, res) => {
  Record.find()
  .lean()
  .populate('category')
  .exec((err, records) => {
    if(err){return handleError(err)}
    records.forEach(record => { record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD') })
    res.render('index', { records })    
  })
});


module.exports = router;