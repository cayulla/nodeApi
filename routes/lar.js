'use strict'

var express = require('express');
var router = express.Router();

const mysql = require('../lib/connMysql');

router.get('/', async (req, res, next) =>{
    try {
        console.log("consultando data")
        
        mysql.query('SELECT * FROM SPIKE.LAR', function(err, results) {
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


  router.post('/', async (req, res, next) =>{
    try {
       
        const dataClientes = await verifyClientes(req.body.clientes);
            
        return res.json({
            success:true,
            clientes:dataClientes
        });

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

  const verifyClientes = async function(clientes){
      var listaCLientes=[];
      var numerador=0;
    for (let index = 0; index < clientes.length; index++) {
        const cliente = await new Promise((resolve, reject) => {
            mysql.query('SELECT NU_CTE,CD_IDENT,CD_DOC_IDENT,IM_LIMITE_CONSUMO FROM SPIKE.LAR WHERE NU_CTE = ?', clientes[index], function (err, results) {
                if (err) reject(err)
                if(results){
                    resolve(results[0]);
                }
            })
        });
        
        if(cliente) {
            listaCLientes[numerador]=cliente;
            numerador++;
        }
    }
    console.log("Total Encontrados = "+ listaCLientes.length);
    return listaCLientes;
  };


module.exports = router;