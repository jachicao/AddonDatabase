//@flow
import {
  ADDON_ENUM_TYPE
} from '../constants/addonType';
var request = require('superagent');

export const requestEnum = () => {
  return {
    type: ADDON_ENUM_TYPE,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/addon/enum/type')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
