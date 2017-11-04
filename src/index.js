// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import epics from './epics';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import 'material-design-icons/iconfont/material-icons.css';

import './index.css';
import './index.scss';

/*
document.addEventListener('DOMContentLoaded', function () {
  if (!("Notification" in window)) {
    return;
  }
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
*/

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(epics), // lets us dispatch() epics
      promiseMiddleware(), // lets us dispatch() promises
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware() // neat middleware that logs actions
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={syncHistoryWithStore(browserHistory, store)} />
  </Provider>,
  document.getElementById('root')
);
