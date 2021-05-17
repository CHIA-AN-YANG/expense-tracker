const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true},
  amount: { type: Number, required: true },
  date: { type: Date, },
  category: { type: String, required: true}
})
module.exports = mongoose.model('Record', recordSchema)

