'use strict';

const mongoose = require('feathers-mongoose');
const model = require('./model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const modelName = 'addon';

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

  app.get(global.getServiceRoute(modelName) + '/enum/category', (req, res, next) => {
    return res.status(200).json(model.schema.path('category').enumValues);
  });

  app.get(global.getServiceRoute(modelName) + '/enum/utility', (req, res, next) => {
    return res.status(200).json(model.schema.path('utilityType').enumValues);
  });

  app.get(global.getServiceRoute(modelName) + '/enum/library', (req, res, next) => {
    return res.status(200).json(model.schema.path('libraryType').enumValues);
  });

  app.get(global.getServiceRoute(modelName) + '/enum/status', (req, res, next) => {
    return res.status(200).json(model.schema.path('status').enumValues);
  });

  app.get(global.getServiceRoute(modelName) + '/enum/type', (req, res, next) => {
    return res.status(200).json(model.schema.path('type').enumValues);
  });


};
