//@flow
import {
  TOKEN_VALIDATION,
} from '../constants/token';

var request = require('superagent');

export const requestTokenValidation = (token: string) => {
  return {
    type: TOKEN_VALIDATION,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/user/validateToken')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .then(resolve, reject);
    })
  };
}
