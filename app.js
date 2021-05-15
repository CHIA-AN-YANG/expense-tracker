
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.static('public'))
const { categoryArr } = require('./public/javascripts/util');

//set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// mongoose
require('./config/mongoose')
//對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。

app.locals.categoryMain = categoryArr;


//提供網頁訊息的 middleware
app.use(function(req, res, next) {
  const d1 = new Date().toLocaleString({year: 'numeric', month: 'short', day: 'numeric'})
  console.log(`method: ${req.method} | router: ${req.url} | time: ${d1}`)
  next()
})

const routes = require('./routes')
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})