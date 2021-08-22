const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  categoryId: { type: Number, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
})

module.exports = mongoose.model('Category', categorySchema)
