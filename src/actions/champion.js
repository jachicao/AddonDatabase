//@flow
import {
  CHAMPION_LIST
} from '../constants/champion';
var request = require('superagent');

export const requestList = () => {
  return {
    type: CHAMPION_LIST,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/champion')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
