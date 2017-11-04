'use strict';

const bodyParser = require('body-parser');
const compression = require('compression');
const timeout = require('connect-timeout');
const errorHandler = require('feathers-errors/handler');
const morgan = require('morgan');
const helmet = require('helmet');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  //Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app. Use the compression middleware for gzip compression in your Express app.
  app.use(compression());

  //redirect
  app.enable('trust proxy');
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    return next();
  });



  //Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
      frameSrc: ["'self'", 'https://www.google.com/recaptcha/'],
      connectSrc: ["'self'", 'wss://localhost', 'wss://web.stack.5530be24.svc.dockerapp.io']
    }
  }));
  app.use(helmet.noCache());
  app.use(helmet.referrerPolicy());

  //Times out a request in the Connect/Express application framework.
  app.use(timeout('5s'));

  // Setup logger
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));

  //print errors
  if (app.get('env') === 'production') {
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      console.log(err);
      res.status(err.status || 500).json({
          message: err.message
      });
      /*
        res.status(err.status || 500).sendFile(require('path').resolve(__dirname, '..', 'build', 'index.html'));
      */
    });
  } else {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).json({
          message: err.message,
          error: err
      });
    });
  }

  /*
  const cors = require('cors');
  //CORS
  const whitelist = ['https://localhost:3000', 'https://localhost', 'http://localhost', 'localhost', 'localhost:80', 'localhost:443'];
  var corsOptionsDelegate = function(req, callback){
    var origin = req.header('origin') || req.header('host');
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    console.log(req.header('origin') + " " + origin + " " + originIsWhitelisted);
    var corsOptions = { origin: originIsWhitelisted }
    callback(originIsWhitelisted ? null : 'Bad request', corsOptions);
  };

  app.options('*', cors(corsOptionsDelegate));
  app.use(cors(corsOptionsDelegate));

  */
  //app.use(errorHandler());

  // Turn on JSON parser for REST services
  app.use(bodyParser.json());
  // Turn on URL-encoded parser for REST services
  app.use(bodyParser.urlencoded({ extended: true }));
};
