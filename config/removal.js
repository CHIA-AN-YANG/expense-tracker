const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection
const Record = require('../models/record');

db.Record.remove({}) 
//run this file to remove all records. Alternatively, you can use the '/destroy' router
// in 'routes/modules/records.js' and 'routes/modules/categories.js'.