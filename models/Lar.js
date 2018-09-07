'use strict'

var express = require('express');
const mysql = require('../lib/connMysql');

function findLar(codCliente){
    return new Promise(function (fulfill, reject){
        mysql.query('SELECT * FROM SPIKE.LAR WHERE NU_CTE = ?', codCliente, function (err, results) {
            if (err) reject(err)

            if(results){
                fulfill(results);
            }
        })
    });
  }

module.exports;