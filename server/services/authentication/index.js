'use strict';

const authentication = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  app.configure(authentication({
    secret: process.env['JWT_USER_SECRET'],
    path: global.getServiceRoute('authentication'),
    services: global.getServiceRoute('user')
  }));

  app.configure(local({
    usernameField: 'username',
    service: global.getServiceRoute('user')
  }));

  app.configure(jwt({
    service: global.getServiceRoute('user')
  }));

  const service = app.service(global.getServiceRoute('authentication'));
  service.before(hooks.before);
  service.after(hooks.after);

};
