'use strict';

const mongoose = require('mongoose');
const readline = require('readline');
const async = require('async');
const db = require('../lib/connMongoDB');

const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

const i18n = require('i18n');

i18n.configure({
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    register: global
});


db.once('open',()=>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Estas seguro de limpiar la BD?',(answer)=>{
        rl.close();
        if(answer.toLowerCase() === 'y'){
            console.log('Run Install Script');
            ejecutaCargaDB();
        }else{
            console.log('Instalacion DEnegada');
            return process.exit(0);
        }
    });
});

    function ejecutaCargaDB(){
        async.series([cargaAnuncios,cargaUsuarios], (err)=>{
            if(err){
                console.error('Hubo un error: ', err);
                return process.exit(1);
            }
            console.log('Carga Exitosa!');
            return process.exit(0);
        });
    }


function cargaAnuncios(cb){
    Anuncio.remove({},()=>{
        console.log('Anuncios Borrados');

        Anuncio.cargaDataFile('util/anuncios.json').then(totCargados =>{
            console.log('Total Cargados: ',totCargados);
            return cb(null,totCargados);
        }).catch(err =>{
            return cb(err);
        });
    });
}

function cargaUsuarios(cb){
    Usuario.remove({}, ()=>{
        console.log('Usuarios Borrados');

        const usuarios = [
            {nombre: 'admin', email: 'cayulla@mail.com', clave: '123456'}
        ];
        
        async.eachSeries(usuarios,Usuario.regUsuario, (err)=>{
            if(err){return cb(err);}

            console.log(`Se han cargado ${usuarios.length} usuarios`);
            return cb(null,usuarios.length);
        });
    });
}



