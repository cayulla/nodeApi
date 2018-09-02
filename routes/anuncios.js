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

 router.post('/',(req,res,next)=>{
   const anuncio = new Anuncio(req.body);
    console.log(anuncio);
   anuncio.save((err,resultado)=>{
       if(err){
           next(err);
           return;
       }
       res.json({success:true, result: resultado});
   });
});

module.exports = router;