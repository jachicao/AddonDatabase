'use strict';

const mongoose = require('mongoose');

module.exports = function() {
  const app = this;

  // Connect to a mongodb server
  mongoose.Promise = global.Promise;
  app.set('mongodb', mongoose.connect('mongodb://' + process.env['MONGO_PORT_27017_TCP_ADDR'] + ':' + Number(process.env['MONGO_PORT_27017_TCP_PORT']) +'/feathers'));

  var db = mongoose.connection;
  db.on('error', (e) => {
    console.info('Mongoose default connection error: ' + e);
  });
  db.on('open', () => {
    console.info('Mongoose default connection opened');
  });
  db.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });
}
