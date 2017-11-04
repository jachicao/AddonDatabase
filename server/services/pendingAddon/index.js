'use strict';

const mongoose = require('feathers-mongoose');
const model = require('./model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const modelName = 'pendingAddon';

  const options = {
    Model: model
  };

  // Initialize our service with any options it requires
  app.use(global.getServiceRoute(modelName), mongoose(options));

  const service = app.service(global.getServiceRoute(modelName));

  // Set up our before hooks
  service.before(hooks.before);

  // Set up our after hooks
  service.after(hooks.after);
};
