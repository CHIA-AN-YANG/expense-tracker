const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');
const { arrRemove, toIcon, categoryArr } = require('../../public/javascripts/util');


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
  return res.render('new', {today:dateSet, category: categoryArr});
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
      let categoryArr2 = []
      for(i=0;i<categoryArr.length;i++){categoryArr2.push(categoryArr[i])}
      const categoryArr3 = arrRemove(categoryArr2, record.category)
      res.render('edit', { today:dateSet, record, categoryEdit:categoryArr3});
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
    res.render('index',{records: filteredData, category: categoryArr})})
  .catch(error => console.error(error))
})

module.exports = router;