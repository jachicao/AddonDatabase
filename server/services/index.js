'use strict';

module.exports = function() {
  const app = this;

  app.configure(require('./authentication'));
  app.configure(require('./user'));
  app.configure(require('./message'));
  app.configure(require('./recaptcha'));
  app.configure(require('./addon'));
  app.configure(require('./champion'));
  app.configure(require('./pendingAddon'));
  app.configure(require('./pendingUser'));
};
