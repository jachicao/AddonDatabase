'use strict';

const mongoose = require('feathers-mongoose');
const model = require('./model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const modelName = 'user';

  const options = {
    Model: model
  };

  // Initialize our service with any options it requires
  app.use(global.getServiceRoute(modelName), mongoose(options));

  // Add a hook to the user service that automatically replaces
  // the password with a hash of the password before saving it.
  const service = app.service(global.getServiceRoute(modelName));

  // Set up our before hooks
  service.before(hooks.before);

  // Set up our after hooks
  service.after(hooks.after);
};
