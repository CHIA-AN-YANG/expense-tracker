const mongoose = require('mongoose')
const Category = require('../category')
const Record = require('../record')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local'
const { categoryArr, toIcon } = require('../../public/javascripts/util')
const record = require('../record')

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection
db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})

db.once('open', () => {
  console.log('mongodb connected in seeder file')

  Record.find().lean().then(
    datas => datas.forEach(data => {
      const categoryObj =toIcon(data)
      Category.create({ 
        name: categoryObj.name, 
        icon: categoryObj.icon, 
        color:  categoryObj.color 
      })
      console.log(categoryObj)
    }
    )
  )
  console.log('finish creating doc in db with category seeder')
})