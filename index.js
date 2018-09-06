'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const i18n = require('i18n');

//require('./lib/connMongoDB');
require('./lib/connMysql');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

//app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res,next)=>{
    res.render('welcome',{title:'API Zone for NodePop'});
});

i18n.configure({
    directory: __dirname+'/locales',
    defaultLocale: 'en',
    register:global
});
app.use(i18n.init);

//Poner las rutas debajo del i18n
app.use('/lar', require('./routes/lar'));
app.use('/adobe', require('./routes/adobe'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/anuncios', require('./routes/anuncios'));

//Gestion de Errores
app.use((err, req, res, next)=>{
    res.status(err.status || 500);

    return res.json({ sucess: false,
        error: { 
            code: err.code || err.status || 500, 
            message: err.message, err: {} }
    });
})

server.listen(3002,()=>{
    console.log('Iniciado la zona de APIs');
})