const express = require('express')
const router = express.Router()
const homeRouter = require('./modules/home')
const recordRouter = require('./modules/records')
const userRouter = require('./modules/users')
const authRouter = require('./modules/auth')
const { authenticator } = require('../middleware/auth.js')

router.use('/users', userRouter)
router.use('/records', authenticator, recordRouter)
router.use('/auth', authRouter)
router.use('/', authenticator, homeRouter)

module.exports = router
