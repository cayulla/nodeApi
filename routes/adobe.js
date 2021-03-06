'use strict'

var express = require('express');
var router = express.Router();

const mysql = require('../lib/connMysql');

router.get('/', async (req, res, next) =>{
    try {
        console.log("consultando data")
        
        mysql.query('SELECT * FROM SPIKE.ADOBE', function(err, results) {
            if (err) throw err
            console.log('Datos Encontrados:')
            
            return res.json({
                success:true,
                data:results
            });
        })  
  
    } catch (error) {
        console.log(error)
      return res.json({
        success:false,
        error:{
            code:401,
            message:error
        }
      });
    }
      
  });

module.exports = router;