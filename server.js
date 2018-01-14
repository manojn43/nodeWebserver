const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));

/*register middle ware*/
app.use((req,res,next) =>{

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+ '\n',(err) =>{
    if(err){
      console.log("error while writing the log");
    }
  });
  next();
});


/*manintance handler*/
app.use((req,res,next) =>{
  res.render('manintance.hbs');
});


/*to make the maintance handler hands for while rendering static pages also */
//app.use(express.static(__dirname +'/public'));


hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.get('/',(req,res) => {

  //res.send('<h1>Hello express!</h1>');
  /*res.send({
    name: 'Manoj',
    list: ['bikes','cars']
  });*/

  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomePage: 'hi welcome to my website'
    //currentYear: new Date().getFullYear()

  })
});


app.get('/about',(req,res) => {


  //res.send('<h1>About Page</h1>');

  res.render('about.hbs',{
    pageTitle: 'About page'
    //currentYear: new Date().getFullYear()

  })
});

app.get('/bad',(req,res) => {

  //res.send('Hello express!</h1>');
  res.send({
    status:'404',
    Message:'Not found'

  });
});

app.listen(port,() =>{
  console.log('Server is up on port ' +port)
});
