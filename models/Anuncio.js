'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

const anuncioSchema = mongoose.Schema({
    nombre:{type: String, index: true},
    venta:Boolean,
    precio:Number,
    foto:String,
    tags:{type:[String], index:true}
});

anuncioSchema.statics.list = (filters, limit,fields)=>{
    const query = Anuncio.find(filters);
    query.limit(limit);
    query.select(fields);

    return query.exec();
}

anuncioSchema.statics.saveData = async (listaAnuncios)=>{
    for(var i = 0; i<listaAnuncios.length; i++){
        //console.log(listaAnuncios[i]);

        console.log("for saveData out");
        await new Promise((resolve, reject) => {

            (new Anuncio(listaAnuncios[i])).save((err,resultado)=>{
                console.log("for saveData in");
                if (err) reject(err)
                if(resultado){
                    resolve(resultado);
                }
            });
        });
      }   
    
}

//Inicializacion de la BD
anuncioSchema.statics.cargaDataFile = async (dataFile)=>{

    const data = await new Promise((resolve, reject)=>{
        fs.readFile(dataFile,{encoding:'utf8'}, (err, data) => {  
            return err ? reject(err): resolve(data);
        });
    });

    if(!data){
        throw new Error(dataFile+' esta Vacio...');
    }

    const anuncios = JSON.parse(data).anuncios;

    for(var i = 0; i<anuncios.length; i++){
        await (new Anuncio(anuncios[i])).save();
    }

    return anuncios.length;
}

const Anuncio = mongoose.model('Anuncio',anuncioSchema);

module.exports = Anuncio;