const mongoose = require('mongoose');
const Category = require('./category.js');

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true},
  amount: { type: Number, required: [true, `Be Honest of how mush u've spent.`] },
  date: { type: Date, Default: Date.now() },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})


module.exports = mongoose.model('Record', recordSchema)

