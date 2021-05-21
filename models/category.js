const mongoose = require('mongoose')
const Record = require('./record.js');

const categorySchema = new mongoose.Schema({
  categoryId: {type: Number, required:true},
  name: { type: String, required:true},
  icon: {type: String, required:true},
  color: {type:String, required:true},
  records: [{type: mongoose.Schema.Types.ObjectId, ref:'Record'}] //Not set. This path is for future development of this project only.
})


module.exports = mongoose.model('Category', categorySchema)



