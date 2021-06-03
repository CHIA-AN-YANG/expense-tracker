const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) 
const db = mongoose.connection
db.on('error', () => {console.log(`mongodb error! URI:${MONGODB_URI}`)})
db.once('open', () => {console.log('mongodb connection successful. from:app.js')})

module.exports = db;
