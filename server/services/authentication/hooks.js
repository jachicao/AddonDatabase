'use strict';

const authentication = require('feathers-authentication');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    authentication.hooks.authenticate('local')
  ],
  update: [],
  patch: [],
  remove: [
    authentication.hooks.authenticate('jwt')
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
