//@flow
import {
  ADDONS
} from '../constants/addon';
var request = require('superagent');

export const requestEnum = () => {
  return {
    type: ADDONS,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/addon')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
