'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.get('/',(req,res,next)=>{
    res.render('welcome',{title:'API Zone for NodePop'});
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);

    res.locals.message = '';
    res.locals.error = err;

    res.render('error');
})

server.listen(3002,()=>{
    console.log('Iniciado la zona de APIs');
})