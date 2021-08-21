const { exit } = require('process')
const mongoose = require('mongoose')
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
const db = mongoose.connection
db.on('error', () => {
  console.log(`mongodb error! URI:${MONGODB_URI}`)
})
const Record = require('../models/record')
const Category = require('../models/category')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  await Record.remove({}, function (err) {
    console.log('record collection removed')
  })
  await Category.remove({}, function (err) {
    console.log('category collection removed')
  })
  await User.remove({}, function (err) {
    console.log('user collection removed')
  })
  exit()
})
