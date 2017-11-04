'use strict';

module.exports = function() {
  const app = this;
  
  //loading enviroment variables
  app.configure(require('./env'));
  app.configure(require('./db'));
};
