const mongoose = require('mongoose')
const Category = require('../category')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local'
const { categoryArr } = require('../../public/javascripts/util')

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection
db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})

db.once('open', () => {
  console.log('mongodb connected in seeder file')
  for(let i=0; i<categoryArr.length; i++){
        Category.create({ name: categoryArr[i]})
  }
  console.log('finish creating doc in db with category seeder')
})