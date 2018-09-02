'use strict';

var express = require('express');
var router = express.Router();

const Usuario = require('../models/Usuario');
const hash = require('hash.js');

router.post('/login', (req,res,next)=>{
console.log("Body= "+req.body);
    const usuario = req.body.usuario;
    const pass = req.body.password;
    console.log('Iniciando Validacion');
    Usuario.findOne({email:usuario}, (err,data)=>{
        if(err){next(err);}

        if(!data){
            return res.json({
                sucess:false,
                error:{
                    code:401,
                    message:'Not found'
                }
            });
        }else if(data){
            const passHash = hash.sha256().update(pass).digest('hex');

            if(data.clave!=passHash){
                return res.json({
                    sucess:false,
                    error:{
                        code:401,
                        message: res.__('users_wrong_password')
                    }
                });
            }else{

                return res.json({
                    sucess:true,
                    token:'123456789'
                });
            }
        }

    });
});


module.exports = router;