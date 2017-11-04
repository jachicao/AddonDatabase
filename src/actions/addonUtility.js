//@flow
import {
  ADDON_ENUM_UTILITY
} from '../constants/addonUtility';
var request = require('superagent');

export const requestEnum = () => {
  return {
    type: ADDON_ENUM_UTILITY,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/addon/enum/utility')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
