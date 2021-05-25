const db = require('../../config/mongoose.js')
const Record = require('../record')
const category = require('../category')

db.on('error', () => {console.log(`mongodb error! URI:${process.env.MONGODB_URI}`)})
db.once('open', () => {

  console.log('mongodb connected in seeder file')
  for (let i = 0; i < 10; i++) {
    let plusNow = Date.now()-5000000*i
    let cateObjId
     //find the corresponding ObjectId in Category Model
    category.findOne({'categoryId':i%5}, function(err, doc){ 
     
      cateObjId = doc._id
      //create one Record doc via for loop
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
