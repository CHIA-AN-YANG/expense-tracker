const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const Category = require('./models/category')
const app = express()
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const passport = require('passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
require('./config/mongoose')
app.use(express.static('public'))
const { categoryArr } = require('./public/javascripts/util')

//set middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// View Engine
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', 'hbs')

// Mongoose
require('./config/mongoose')

// Full scope variable
app.locals.categoryMain = categoryArr

//提供網頁訊息的 middleware
app.use(function (req, res, next) {
  let reqStart, reqEnd
  reqStart = Date.now()
  res.on('close', () => {
    reqEnd = Date.now()
    const d1 = new Date().toLocaleString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: 'false',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    console.log(
      `${d1} | ${req.method} from ${req.url} | total time: ${
        reqEnd - reqStart
      } ms`
    )
  })
  next()
})

// Passport & Connect-flash
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

//Route Setting
const routes = require('./routes')
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
