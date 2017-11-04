//@flow
import {
  PENDING_USER_NEW,
  PENDING_USER_TYPE_ENUM,
  PENDING_USER_REMOVE_TOKEN
} from '../constants/pendingUser';
var request = require('superagent');

export const requestNewPendingUser = (token: string, type: string) => {
  return {
    type: PENDING_USER_NEW,
    payload: new Promise((resolve, reject) => {
      request('POST', '/api/pendingUser')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        type: type
      })
      .then(resolve, reject);
    })
  };
}

export const requestEnum = (token: string) => {
  return {
    type: PENDING_USER_TYPE_ENUM,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/pendingUser/enum/type')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .then(resolve, reject);
    })
  };
}


export const removeToken = () => {
  return {
    type: PENDING_USER_REMOVE_TOKEN
  };
}
