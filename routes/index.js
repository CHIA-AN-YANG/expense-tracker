const express = require('express');
const router = express.Router();
const homeRouter = require('./modules/home');
const recordRouter = require('./modules/records');



router.use('/records', recordRouter);
router.use('/', homeRouter);


module.exports = router;