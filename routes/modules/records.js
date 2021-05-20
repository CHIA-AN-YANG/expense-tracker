const express = require('express');
const router = express.Router();
const Record = require('../../models/record')
const moment = require('moment')
const { arrRemove, toIcon } = require('../../public/javascripts/util');
const { set } = require('mongoose');


//create
router.get('/new', (req, res) => {
  const dateSet = moment(new Date()).format('YYYY[-]MM[-]DD')
  return Record.find()
  .lean({ virtuals: true })
  .then(docs =>{
    let cateArr = docs.map(doc => doc.category.name)
    cateArr = [...new Set(cateArr)]
    res.render('new', { today: dateSet, category: cateArr });
  })
   
});
router.post('/', (req, res) => {
  let {name, date, categoryId, amount} = req.body
  return Record.create({name, date, categoryId, amount})   
    .then(() => res.redirect('/')) 
    .catch(error => console.log('add new',error))
});


//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
  .lean({ virtuals: true })
  .then(
    record => {
      record.momentDate = moment(record.date).format('YYYY[-]MM[-]DD')
      return Record.find()
      .lean({ virtuals: true })
      .sort({ date: `asc` })
      .then(docs =>{
        let cateArr = docs.map(doc => doc.category.name)
        cateArr = [...new Set(cateArr)]
        // let cateArr = docs.map(doc => {
        //   let isActive = false
        //   if(doc.category.name === record.category.name){ isActive = true }
        //   return { 'name': doc.category.name, 'isActive': isActive, 'idx': doc.category.idx }        
        // })
        res.render('edit', { record, categoryEdit: cateArr});
      })
    }
  )
  
});
router.put('/:id', (req, res) => {
  const id = req.params.id
  let {name, date, categoryId, amount} = req.body
  console.log(id)
  console.dir(req.body)
  Record.findById(id)
        .then( record =>{
          record.name = name
          record.categoryId = categoryId
          record.amount = amount
          record.date = date
          record.save()
        }
        )
        .then(() => {res.redirect('/')})
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
  .then(data => { filteredData = data.filter(el =>{ return el.category==keyword }) })
  .then(() =>{
    toIcon(filteredData);
    return Category.find()
    .lean()
    .then(data =>{
      const cateArr = data.map(el => el.name)
      res.render('index', {records: filteredData, category: cateArr});
    })
  })
  .catch(error => console.error(error))
})

module.exports = router;