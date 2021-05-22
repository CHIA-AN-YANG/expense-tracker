const mongoose = require('mongoose')
const Record = require('../record')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local'
const { toCategoryObjId } = require('../../public/javascripts/util')
const category = require('../category')
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection




db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})
db.once('open', () => {

  console.log('mongodb connected in seeder file')
  for (let i = 0; i < 10; i++) {
    let plusNow = Date.now()-5000000*i
    let cateObjId
<<<<<<< HEAD

     //find the corresponding ObjectId in Category Model
    category.findOne({'categoryId':i%5}, function(err, doc){ 
     
      cateObjId = doc._id
      //create one Record doc via for loop
=======
    category.findOne({'categoryId':i%5}, function(err, doc){
      cateObjId = doc._id
>>>>>>> 46c26c92b5a8ed67d82e6fffc6cc8c0fa18d3132
      Record.create(
        { 
          name: 'name-' + i, 
          amount: 1000+i*3, 
          date: plusNow, 
          category: String(cateObjId)
        }
      )
    })

  }
  
  console.log('finish creating doc in db with record seeder')
})
