'use strict'

var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');


router.get('/', async (req, res, next) =>{
  try {
    const filter={};
    
    var anuncios = await Anuncio.list(filter);

    return res.json({
      sucess:true,
      anuncios:anuncios
    });

  } catch (error) {

    return res.json({
      sucess:false,
      error:{
          code:401,
          message:error
      }
    });
  }
    
});

router.post('/', async (req, res, next) =>{

  try {
    const listaAnuncios=req.body.anuncios;
    var listaResultados = new Array();
    for(var i = 0; i<listaAnuncios.length; i++){
      console.log("for saveData out ("+i+")");
      const  resultado = await new Promise((resolve, reject) => {
          (new Anuncio(listaAnuncios[i])).save((err,resultado)=>{
              console.log("for saveData in");
              if (err) reject(err)
              if(resultado){
                  resolve(resultado);
              }
          });
      });
      listaResultados.push(resultado);
    }  
    
    //const resultado = await Anuncio.saveData(req.body.anuncios);
    console.log(listaResultados);
    console.log("For terminado");
    res.json({success:true, result: listaResultados});

  } catch (error) {
    console.log("Catch");
    console.log(error);
    return res.json({
      sucess:false,
      error:{
          code:401,
          message:error
      }
    });
  }
});

module.exports = router;