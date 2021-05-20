const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true},
  amount: { type: Number, required: true },
  date: { type: Date, },
  categoryId: { type: Number, required: true} //對於固定的類別資料，用categoryId去呼喚
})
module.exports = mongoose.model('Record', recordSchema)

