'use strict';

const feathers = require('feathers');
const path = require('path');
module.exports = function() {
  const app = this;
  console.log("loading views");
  app.use(feathers.static(path.resolve(__dirname, '..', '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
  });
};
