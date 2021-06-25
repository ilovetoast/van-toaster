const express = require('express')
const exphbs = require('express-handlebars');
const { exec } = require('child_process')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express()
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.engine('handlebars', exphbs());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'views/'));
app.use('/static',express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/wifi', (req, res) => {
  
  exec("iwlist scan", (e,s,se) =>{
	  if(e){
	  	res.json({err: e });
	  }else if(se){
	  	res.json({err: se });
	  }else{
	  	res.json({res: s});
	  }
  });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
