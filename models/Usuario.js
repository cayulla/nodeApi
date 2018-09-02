'use strict';

const mongoose = require('mongoose');
const hash = require('hash.js');
const v = require('validator');

const usuarioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    email: { type: String, index: true },
    clave: String
});


usuarioSchema.statics.regUsuario = (registro,cb)=>{
    const errValidacion=[];
    if(!(v.isAlpha(registro.nombre) && v.isLength(registro.nombre,2))){
        errValidacion.push({field:'nombre', message: __('validation_invalid', {field:'nombre'}) });
    }

    if(!v.isEmail(registro.email) ){
        errValidacion.push({field:'email', message: __('validation_invalid', {field:'email'}) });
    }

    if(!v.isLength(registro.clave,6) ){
        errValidacion.push({field:'clave', message: __('validation_minchars', {num:'6'}) });
    }

    if(errValidacion.length >0){
        return cb({ code: 422, errors: errValidacion });
    }


    Usuario.findOne({email:registro.email}, (err,user)=>{
        if(err){
            return cb(err);
        }

        if(user){
            return cb({ code: 409, message: __('user_email_duplicated') });
        }else{

            let hashedClave = hash.sha256().update(registro.clave).digest('hex');

            registro.clave = hashedClave;
            new Usuario(registro).save(cb);
        }

    });
}


var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;