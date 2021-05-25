const db = require('../../config/mongoose.js')
const Category = require('../category')
const seeder = require('./categorySeeder.json')

db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})

db.once('open', () => {
  console.log('mongodb connected in seeder file')
  Category.insertMany(seeder)
  console.log('finish creating doc in db with category seeder')
})