//@flow
import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants/user';

var request = require('superagent');

export const requestRegister = (token: string, recaptcha: string, username: string, password: string) => {
  return {
    type: USER_REGISTER,
    payload: new Promise((resolve, reject) => {
      request('POST', '/api/user/register')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        recaptcha: recaptcha,
        username: username,
        password: password
      })
      .then(resolve, reject);
    })
  };
}

export const requestLogin = (recaptcha: string, username: string, password: string) => {
  return {
    type: USER_LOGIN,
    payload: new Promise((resolve, reject) => {
      request('POST', '/api/user/login')
      .set('Accept', 'application/json')
      .send({
        recaptcha: recaptcha,
        username: username,
        password: password
      })
      .then(resolve, reject);
    })
  };
}

export const requestLogout = () => {
  return {
    type: USER_LOGOUT
  };
}
