
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

let reqStart, reqEnd
//提供網頁訊息的 middleware
app.use(function(req, res, next) {
  reqStart = Date.now()
  res.on('close', () => {
      reqEnd = Date.now()
      const d1 = new Date().toLocaleString('zh-TW', {
        year:'numeric', month:'short',  day:'numeric', 
        hour12:'false', hour:'2-digit', minute:'2-digit', second:'2-digit'})
      console.log(`${d1} | ${req.method} from ${req.url} | total time: ${reqEnd-reqStart} ms`)
  })
  next()  
})



const routes = require('./routes')
app.use(routes,(req, res, next) => {
  console.log('end!')} )



app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})