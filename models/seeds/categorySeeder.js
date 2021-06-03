const db = require('../../config/mongoose.js')
const Category = require('../category')
const seeder = require('./categorySeeder.json')

db.once('open', () => {
  console.log('mongodb connected in seeder file')
  Category.insertMany(seeder)
  console.log('finish creating doc in db with category seeder')
})


