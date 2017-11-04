'use strict';

module.exports = function() {
  const app = this;

  app.get(global.getServiceRoute('recaptcha'), function(req, res, next) {
    return res.status(200).json(process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY);
  })
};
