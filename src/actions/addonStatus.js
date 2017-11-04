//@flow
import {
  ADDON_ENUM_STATUS
} from '../constants/addonStatus';
var request = require('superagent');

export const requestEnum = () => {
  return {
    type: ADDON_ENUM_STATUS,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/addon/enum/status')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
