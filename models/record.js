const mongoose = require('mongoose');
const Category = require('./category.js');

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  name: { 
    type: String, 
    required: true
  },
  amount: { type: Number, required: [true, `Be Honest of how mush u've spent.`] },
  date: { 
    type: Date, 
    Default: Date.now(),
    // min: '1970-01-01'
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  merchant: { type: String }
})

module.exports = mongoose.model('Record', recordSchema)

