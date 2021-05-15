const express = require('express');
const router = express.Router();
const homeRouter = require('./modules/home');
const recordRouter = require('./modules/records');

//提供網頁訊息的 middleware
router.use(function(req, res, next) {
  const d1 = new Date().toLocaleString()
  console.log(`method: ${req.method}, router: ${req.url}, time: ${d1}`)
  next()
})

router.use('/records', recordRouter);
router.use('/', homeRouter);


module.exports = router;