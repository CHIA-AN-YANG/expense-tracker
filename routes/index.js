const express = require('express');
const router = express.Router();
const homeRouter = require('./modules/home');
const recordRouter = require('./modules/records');
const categoryRouter = require('./modules/categories');
const userRouter = require('./modules/users')
const { authenticator } = require('../middleware/auth.js')

router.use('/users', userRouter)
router.use('/records', authenticator, recordRouter);
router.use('/categories', categoryRouter);
router.use('/', authenticator, homeRouter);

module.exports = router;