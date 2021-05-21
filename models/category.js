const mongoose = require('mongoose')
const Record = require('./record.js');

const categorySchema = new mongoose.Schema({
  categoryId: {type: Number, required:true},
  name: { type: String, required:true},
  icon: {type: String, required:true},
  color: {type:String, required:true},
  records: [{type: mongoose.Schema.Types.ObjectId, ref:'Record'}]
})


module.exports = mongoose.model('Category', categorySchema)



