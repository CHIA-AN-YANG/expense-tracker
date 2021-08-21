const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

//User registration page
router.get('/register', (req, res) => {
  return res.render('register')
})

//Send registration info
router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ user_email: email }).then((user) => {
    if (user) {
      errors.push({ message: '用戶已經存在，請登入。' })
    }
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符。' })
    }
    console.error('errors array: ', errors)
    if (errors.length) {
      return res.render('register', { errors, name, email })
    }
    return bcrypt //Save new user to DB
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          user_name: name,
          user_email: email,
          password: hash,
        })
      )
      .then(() => {
        req.flash('success_msg', '註冊成功！請登入以使用本服務。')
        res.redirect('/users/login')
      })
      .catch((err) => console.log(err))
  })
})

//Login page
router.get('/login', (_, res) => {
  return res.render('login')
})

//Send login info
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

//Send logout request
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出。')
  res.redirect('/users/login')
})

module.exports = router
