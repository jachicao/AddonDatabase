'use strict';

module.exports = function() {
  const app = this;
  //require('./discord');
  app.configure(require('./champions'));
}
