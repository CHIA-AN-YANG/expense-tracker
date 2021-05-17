const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const { toIcon } = require('../../public/javascripts/util');
const moment = require('moment')

/* GET users listing. */
router.get('/', (req, res) => {
  Record.find()
  .lean()
  .sort({ _id: 'asc' })
  .then(
    records => {
    toIcon(records);
    records.forEach(record => record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD'))
    res.render('index', { records })
    }
      )
  .catch(error => console.error('homepage', error))
});

//will delete all documents in "records", please use carefully.
router.get('/destroy', (req, res) => {
  return Record.deleteMany({}, () => res.redirect('/')).catch(error => console.log('add new',error))
});

module.exports = router;