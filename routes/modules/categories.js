const express = require('express');
const router = express.Router()
const Category = require('../../models/category')

//will remove all documents in "categories", please use carefully.
router.get('/destroy', (req, res) => {
  return Category.deleteMany({}, () => {
    console.log('All category documents have been removed.')  
    res.redirect('/')
  }).catch(error => console.log('categories/destroy',error))
});

module.exports = router;