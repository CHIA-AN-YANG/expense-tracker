const mongoose = require('mongoose')
const Record = require('../record')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local'
const { categoryArr } = require('../../public/javascripts/util')
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection

db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})
db.once('open', () => {
  console.log('mongodb connected in seeder file')
  for (let i = 0; i < 10; i++) {
    let plusNow = Date.now()-5000000*i
    Record.create(
      { 
        name: 'name-' + i, 
        amount: 1000+i*3, 
        date: plusNow, 
        categoryId: i%5 
      }
    )
  }
  
  console.log('finish creating doc in db with record seeder')
})