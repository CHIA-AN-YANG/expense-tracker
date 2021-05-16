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
    let d = new Date().toLocaleString( {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    console.log('d:',d)
    d = d.split(", ")
    d = d[0]
    d = d.split("/")
    let dateSet = [d[2],d[1],d[0]]
    dateSet = dateSet.join("-")
    Record.create(
      { 
        name: 'name-' + i, 
        amount: 1000+i*3, 
        date: dateSet, 
        category: categoryArr[i%5] 
      }
    )}
  console.log('finish creating doc in db with record seeder')
})