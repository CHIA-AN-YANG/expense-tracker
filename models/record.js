const mongoose = require('mongoose');
const { toIcon } = require('../public/javascripts/util');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true},
  amount: { type: Number, required: [true, `Be Honest of how mush u've spent.`] },
  date: { type: Date, Default: Date.now() },
  categoryId: { type: Number, required: true} //對於固定的類別資料，用categoryId去呼喚
})


recordSchema.virtual('category').get(function(){ //建立一個不做validation，經由其他path generate出來的虛擬path
  return toIcon(this.categoryId)
})
recordSchema.plugin(mongooseLeanVirtuals) //讓virtual出來的path即使經過lean()也不會出錯

module.exports = mongoose.model('Record', recordSchema)

