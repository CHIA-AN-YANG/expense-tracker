const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: Date}
})
module.exports = mongoose.model('Category', categorySchema)

