'use strict';

const hooks = require('feathers-hooks-common');
const authentication = require('feathers-authentication');
const permissions = require('feathers-permissions');

exports.before = {
  all: [
    //authentication.hooks.authenticate('jwt'),
    //permissions.hooks.checkPermissions({ service: global.getServiceRoute('') }),
    //permissions.hooks.isPermitted()
  ],
  find: [

  ],
  get: [

  ],
  create: [
    hooks.disable()
  ],
  update: [
    hooks.disable()
  ],
  patch: [
    hooks.disable()
  ],
  remove: [
    hooks.disable()
  ]
};

exports.after = {
  all: [

  ],
  find: [

  ],
  get: [

  ],
  create: [

  ],
  update: [

  ],
  patch: [

  ],
  remove: [

  ]
};
