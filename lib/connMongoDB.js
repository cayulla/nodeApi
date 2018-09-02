'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', err =>{
  console.log('Connection Error', err);
  process.exit(1);
});

db.once('open', function() {
    console.info('Connected to MongoDB');
});

mongoose.connect('mongodb://nodepop:nodepop@127.0.0.1:27017/nodepop');

module.exports = db;