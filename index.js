/**
 * Index file to manage GET and POST requests.
 */

var express=require('express');
const bodyParser = require('body-parser');

var app=express();
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.raw());
app.use(bodyParser.text());

//GET method for the index page.
app.get('/',function(req,res)
{
    res.send('Kata Chat app.');
});

//POST method to test the Kata app.
app.post('/chat',function(req,res)
{
    console.log(req.body);
    res.sendStatus(200);
});

var server=app.listen(3000,function() {});