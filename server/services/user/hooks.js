'use strict';

const authentication = require('feathers-authentication');
const hooks = require('feathers-hooks-common');
const local = require('feathers-authentication-local');
const permissions = require('feathers-permissions');

exports.before = {
  all: [

  ],
  find: [
    //authentication.hooks.authenticate('jwt'),
    //permissions.hooks.checkPermissions({ service: global.getServiceRoute('user') }),
    //permissions.hooks.isPermitted()
  ],
  get: [
    //authentication.hooks.authenticate('jwt'),
    //permissions.hooks.checkPermissions({ service: global.getServiceRoute('user') }),
    //permissions.hooks.isPermitted()
  ],
  create: [
    local.hooks.hashPassword()
  ],
  update: [
    authentication.hooks.authenticate('jwt'),
    //permissions.hooks.checkPermissions({ service: global.getServiceRoute('user') }),
    //permissions.hooks.isPermitted(),
    local.hooks.hashPassword()
  ],
  patch: [
    authentication.hooks.authenticate('jwt'),
    //permissions.hooks.checkPermissions({ service: global.getServiceRoute('user') }),
    //permissions.hooks.isPermitted(),
    local.hooks.hashPassword()
  ],
  remove: [
    authentication.hooks.authenticate('jwt'),
    //permissions.hooks.checkPermissions({ service: global.getServiceRoute('user') }),
    //permissions.hooks.isPermitted()
  ]
};

exports.after = {
  all: [
    hooks.remove('password')
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
