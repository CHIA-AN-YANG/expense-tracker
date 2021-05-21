const express = require('express');
const router = express.Router();
const Record = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')

//create
router.get('/new', (req, res) => {
  const dateSet = moment(new Date()).format('YYYY[-]MM[-]DD')
  return Category.find()
  .lean()
  .then(docs =>{
    res.render('new', { today: dateSet, category: docs });
  })   
});
router.post('/', (req, res) => {
  let {name, date, categoryId, amount} = req.body
  categoryId = Number(categoryId)
  let cateObjId
  return Category.findOne(
    { 'categoryId':categoryId }, 
    function(err, doc){
      cateObjId = doc._id
      Record.create(
        { 
          name: name, 
          amount: amount, 
          date: date, 
          category: cateObjId
        }
      )
    })  
    .then(() => res.redirect('/')) 
    .catch(error => console.log('add new',error))
});


//edit
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
      })
    }
  )
  
});
router.put('/:id', (req, res) => {
  const id = req.params.id
  let {name, date, categoryId, amount} = req.body
  let cateObjId
  categoryId = Number(categoryId)
  return Category.findOne(
    {'categoryId':categoryId}, 
    function(err, doc){
      cateObjId = doc._id
      Record.findById(id)
      .then( record =>{
        record.name = name
        record.category = cateObjId
        record.amount = amount
        record.date = date
        record.save()
      }
    )
    })  
    .then(() => res.redirect('/')) 
    .catch(error => console.log('edit',error))
});

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id).then(data => data.remove()).then(() => res.redirect('/'))
  .catch(error => console.log('delete:',error))
})

//filter: category
router.get('/category', (req, res) => {
  const keyword = req.query.keyword
  let filteredData = []
  Record.find()
  .lean()
  .populate('category')
  .exec((err, docs) => {
    if(err){return handleError(err)}
    docs.forEach(doc => { doc.momentDate = moment(doc.date).format('YYYY[-]MM[-]DD') })
    filteredData = docs.filter(el =>{ return el.category.categoryId==keyword })
      res.render('index', {records: filteredData}); 
  })
})


//will delete all documents in "records", please use carefully.
router.get('/destroy', (req, res) => {
  return Record.deleteMany({}, () => {
    console.log('All record documents have been removed.')  
    res.redirect('/')
  }).catch(error => console.log('add new',error))
});

module.exports = router;