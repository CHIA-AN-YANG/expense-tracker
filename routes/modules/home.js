const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const { toIcon } = require('../../public/javascripts/util');

/* GET users listing. */
router.get('/', (req, res) => {
  Record.find()
  .lean()
  .sort({ _id: 'asc' })
  .then(
    records => {
    toIcon(records);
    res.render('index', { records })
    }
      )
  .catch(error => console.error('homepage', error))
});

module.exports = router;