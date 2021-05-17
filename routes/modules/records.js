const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');
const { arrRemove, toIcon } = require('../../public/javascripts/util');


//create
router.get('/new', (req, res) => {
  let d = new Date().toLocaleString( {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  d = d.split("/")
  let dateSet = [d[2],d[1],d[0]]
  dateSet = dateSet.join("-")
  return Category.find()
  .lean()
  .then(data =>{
    const cateArr = data.map(el => el.name)
    res.render('new', {today:dateSet, category: cateArr});
  })
   
});
router.post('/', (req, res) => {
  let {name, date, category, amount} = req.body
  return Record.create({name, date, category, amount})   
    .then(() => res.redirect('/')) 
    .catch(error => console.log('add new',error))
});


//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
  .lean()
  .then(
    record => {
      //dd-mm-yyyy => yyyy-mm-dd
      const dateSet = record.date
      return Category.find()
      .lean()
      .then(data =>{
        const cateArr = data.map(el => el.name)
        arrRemove(cateArr, record.category)
        res.render('edit', { today: dateSet, record, categoryEdit: cateArr});
      })
    }
  )
  
});
router.put('/:id', (req, res) => {
  const id = req.params.id
  let {name, date, category, amount} = req.body
  Record.findById(id)
        .then( record =>{
          record.name = name
          record.category = category
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