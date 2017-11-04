//@flow
/*
import Constants from '../constants/TwoFactorConstants';
import Dispatcher from '../dispatchers/AppDispatcher';
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var _changeListeners = [];

var _success = false;
var _message = "";

var _otpauth_url = "";

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
   this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  hasSucceeded() {
    return _success;
  },

  getMessage() {
    return _message;
  },

  getOTPauthUrl() {
    return _otpauth_url;
  }

});

Store.dispatchToken = Dispatcher.register(action => {
  switch(action.actionType) {
    case Constants.RECEIVE_TWO_FACTOR_NEW:
      _success = action.success;
      _message = action.message;
      _otpauth_url = action.otpauth_url;
      Store.emitChange();
      break;
  case Constants.RECEIVE_TWO_FACTOR_NEW_ERROR:
      _success = action.success;
      _message = action.message;
      _otpauth_url = "";
      Store.emitChange();
      break;
    default:
      break;
  }
});

export default Store;
*/
