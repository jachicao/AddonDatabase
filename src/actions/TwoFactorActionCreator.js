//@flow
/*
import Constants from '../constants/TwoFactorConstants';
import Dispatcher from '../dispatchers/AppDispatcher';
var request = require('superagent');
var secureRequestPromise = require('../utils/secure_request_promise');

module.exports = {
  getOTPauthUrl: function() {
    secureRequestPromise(
      request
        .post('/api/user/two_factor/new')
    )
    .then((response) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_NEW,
        success: response.success,
        message: response.message,
        otpauth_url: response.otpauth_url
      });
    })
    .catch((error) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_NEW_ERROR,
        success: false,
        message: 'Failed to get two factor secret'
      });
    });
  },

  verifyNewSecret: function(two_factor_token: string) {
    secureRequestPromise(
      request
        .put('/api/user/two_factor/new/verify')
        .send({
          two_factor_token: two_factor_token
        })
    )
    .then((response) => {
      console.log(response);
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_NEW_VERIFICATION,
        success: response.success,
        message: response.message,
        jwt_token: response.jwt_token
      });
    })
    .catch((error) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_NEW_VERIFICATION_ERROR,
        success: false,
        message: 'Failed to verify two factor token'
      });
    });
  },

  isVerified: function() {
    secureRequestPromise(
      request
        .get('/api/user/two_factor/verified')
    )
    .then((response) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_VERIFIED,
        success: response.success,
        message: response.message
      });
    })
    .catch((error) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_VERIFIED_ERROR,
        success: false,
        message: 'Failed to check if two factor is verified'
      });
    });
  },

  verify: function(two_factor_token: string) {
    secureRequestPromise(
      request
        .get('/api/user/two_factor/verify')
        .send({
          two_factor_token: two_factor_token
        })
    )
    .then((response) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_VERIFICATION,
        success: response.success,
        message: response.message,
        jwt_token: response.jwt_token
      });
    })
    .catch((error) => {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_TWO_FACTOR_VERIFICATION_ERROR,
        success: false,
        message: 'Failed to verify two factor token'
      });
    });
  },

};
*/
