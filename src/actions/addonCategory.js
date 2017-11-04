//@flow
import {
  ADDON_ENUM_CATEGORY
} from '../constants/addonCategory';
var request = require('superagent');

export const requestEnum = () => {
  return {
    type: ADDON_ENUM_CATEGORY,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/addon/enum/category')
      .set('Accept', 'application/json')
      .then(resolve, reject);
    })
  };
}
