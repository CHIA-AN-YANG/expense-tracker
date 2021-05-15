const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection
db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})
db.once('open', () => {console.log('mongodb connection successful. from:app.js')})
