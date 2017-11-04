import {
  RECAPTCHA_PUBLIC_KEY,
  RECAPTCHA_RESPONSE,
  RECAPTCHA_RESPONSE_RESET,
  RECAPTCHA_RESET,
  RECAPTCHA_RESET_DONE
} from '../constants/recaptcha';

var request = require('superagent');

export const requestPublicKey = () => {
  return {
    type: RECAPTCHA_PUBLIC_KEY,
    payload: new Promise((resolve, reject) => {
      request('GET', process.env.REACT_APP_ROUTE_API_V1 + 'recaptcha')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
};

export const setResponse = (response: string) => {
  return {
    type: RECAPTCHA_RESPONSE,
    payload: {
      response: response
    }
  };
};

export const resetResponse = () => {
  return {
    type: RECAPTCHA_RESPONSE_RESET
  };
};

export const requestReset = () => {
  return {
    type: RECAPTCHA_RESET
  };
};

export const resetIsDone = () => {
  return {
    type: RECAPTCHA_RESET_DONE
  };
};
