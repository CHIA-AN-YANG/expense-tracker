const express = require('express');
const router = express.Router();
const Record = require('../../models/record')
const Category = require('../../models/category')
const flash = require('connect-flash')
const moment = require('moment')

const d = new Date()
const currentYear = Number(d.getFullYear())
const months = Array.from({length:12}, (_, i) => i+1 )  
const years = Array.from({length:(currentYear-2000)}, (_, i) => 2000+i)

// create a new record
router.get('/new', (req, res) => {
  const dateSet = moment(new Date()).format('YYYY[-]MM[-]DD')
  return Category.find()
  .lean()
  .then(docs =>{
    res.render('new', { today: dateSet, category: docs });
  })   
});
router.post('/', (req, res) => {
  const userId = req.user._id
  let {name, date, categoryId, merchant, amount} = req.body
  categoryId = Number(categoryId)
  let cateObjId
  return Category.findOne(
    { 'categoryId':categoryId }, 
    function(err, doc){
      cateObjId = doc._id
      Record.create({ userId, name, amount, date, merchant, category: cateObjId })
    })  
    .then(() => res.redirect('/')) 
    .catch(error => console.log('add new',error))
})


// edit a record
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
  .lean()
  .populate('category')
  .exec(
    (err, record) => {
      if(err){ console.log(handleError(err))}
      record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD')
      return Category.find()
      .lean()
      .then(docs =>{
        docs.forEach(doc => {
         if(record.category.categoryId == doc.categoryId){ doc.isActive = true }
        })
        res.render('edit', { record, category: docs});
      })})  
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  let {name, date, categoryId, merchant, amount} = req.body
  let cateObjId
  categoryId = Number(categoryId)
  return Category.findOne({'categoryId':categoryId})
    .then( doc => {
      cateObjId = doc._id
      Record.findById(id)
      .then( record =>{
        record.name = name
        record.category = cateObjId
        record.amount = amount
        record.merchant = merchant
        record.date = date
        record.save()
        }
      )
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    })})

// delete a record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id).then(data => data.remove()).then(() => res.redirect('/'))
  .catch(error => console.log('delete:',error))
})

router.get('/filter', (req, res) => {
  const keyword = req.query.keyword+""
  const year = req.query.pickyear
  const month = req.query.pickmonth
  const userId = req.user._id

// filter with category & month
const filter = function(id, cate, start, end){
  let filteredData = []
  console.log(`start: ${start} end: ${end}`)
  Record.find({ userId: id, date: { $gte: start, $lt: end }})
  .lean()
  .populate('category')
  .exec((err, docs) => {
    if(err){return console.log(err)}
    docs.forEach(doc => { doc.momentDate = moment(doc.date).format('YYYY[-]MM[-]DD') })
    if(cate){
      filteredData = docs.filter(el =>{ return el.category.categoryId==Number(cate) })
    }else{ filteredData = docs }
    
    console.log(`filteredData: ${filteredData}`)  
    return res.render('index', {records: filteredData, currentYear, months, years}); 
  })
}
  if(!(keyword || month)){
    req.flash('error_msg', '類別與月份至少要選一個。')
  }
  if(!month){
    filter(userId, keyword, "1970-1-1", "2040-12-31")
  }else{
    //use JavaScript ISO Dates formate
    let monthNext = Number(month)+1
    let dstart = new Date(`${year}-${month>9 ? month : '0'+month}-01`)
    let dtemp = new Date(`${year}-${monthNext>9 ? monthNext : '0'+monthNext}-01`)
    let dend = new Date(dtemp.setDate(dtemp.getDate()-1))
    filter(userId, keyword, dstart, dend)
  }
})

// will delete all documents in "records", please use carefully.
router.get('/destroy', (req, res) => {
  return Record.deleteMany({}, () => {
    console.log('All record documents have been removed.')  
    res.redirect('/')
  }).catch(error => console.log('add new',error))
});

module.exports = router;