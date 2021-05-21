const express = require('express');
const router = express.Router();
const homeRouter = require('./modules/home');
const recordRouter = require('./modules/records');
const categoryRouter = require('./modules/categories');

router.use('/records', recordRouter);
router.use('/categories', categoryRouter);
router.use('/', homeRouter);

module.exports = router;