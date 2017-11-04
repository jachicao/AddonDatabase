'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const config = require('./config');
const middleware = require('./middleware');
const services = require('./services');
const bots = require('./bots');
const views = require('./views');

// Create a feathers instance.
const app = feathers();

//loading config files
app.configure(config);

app.configure(middleware);

//hooks
app.configure(hooks());

// Enable the REST provider for services.
app.configure(rest());

// Enable the socketio provider for services.
app.configure(socketio({
    wsEngine: 'uws'
  }));

// configure services
app.configure(services);

const httpServer = http.createServer(app).listen(80, () => {
  console.log('opened http server on: ', httpServer.address());
  //app.setup(httpServer);
  const httpsServer = https.createServer({
    key: fs.readFileSync('./keys/private.key'),
    cert: fs.readFileSync('./keys/certificate.pem')
  }, app)
    .listen(443, () => {
      console.log('opened https server on: ', httpsServer.address());
      app.setup(httpsServer);

      //configure views
      app.configure(views);

      //enable bots
      app.configure(bots);
    });
});
