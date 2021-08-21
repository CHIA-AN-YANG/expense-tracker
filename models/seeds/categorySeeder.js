const { exit } = require('process')
const db = require('../../config/mongoose.js')
const Category = require('../category')
const seeder = require('./categorySeeder.json')

db.once('open', () => {
  return Category.insertMany(seeder).then(() => {
    console.log('finish creating doc in db with category seeder')
    exit()
  })
})
