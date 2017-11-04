import io from 'socket.io-client';
import RxJS from 'rxjs';
import superagent from 'superagent';
import feathers from 'feathers-client';
import rx from 'feathers-reactive';
import authentication from 'feathers-authentication-client';
import rest from 'feathers-rest/client';

const app = feathers()
  //.configure(rest('').superagent(superagent))
  .configure(feathers.socketio(io()))
  .configure(feathers.hooks())
  .configure(authentication({
    storage: window.localStorage,
    path: process.env.REACT_APP_ROUTE_API_V1 + 'authentication',
    service: process.env.REACT_APP_ROUTE_API_V1 + 'user'
  }))
  .configure(rx(RxJS));

  app.authenticate({
    strategy: 'local',
    username: 'admin',
    password: 'admin'
  })
  .then(response => {
    console.log('Authenticated!', response);
    return app.passport.verifyJWT(response.accessToken);
  })
  .then(payload => {
    console.log('JWT Payload', payload);
    return app.service(process.env.REACT_APP_ROUTE_API_V1 + 'user').get(payload.userId);
  })
  .then(user => {
    app.set('user', user);
    console.log('User', app.get('user'));
  })
  .catch(function(error){
    console.error('Error authenticating!', error);
  });


export default (state = {
  socketio: app
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
