const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: Object}
})
module.exports = mongoose.model('Category', categorySchema)

