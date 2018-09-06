'use strict';

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'spike'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to Mysql...')

})


module.exports = connection;