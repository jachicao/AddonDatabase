//@flow
import {
  ADDON_ENUM_LIBRARY
} from '../constants/addonLibrary';
var request = require('superagent');

export const requestEnum = () => {
  return {
    type: ADDON_ENUM_LIBRARY,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/addon/enum/library')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
