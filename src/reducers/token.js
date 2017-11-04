import {
  USER_REGISTER_FULFILLED,
  USER_LOGIN_FULFILLED,
  USER_LOGOUT
} from '../constants/user';

import {
  TOKEN_VALIDATION_PENDING,
  TOKEN_VALIDATION_REJECTED,
  TOKEN_VALIDATION_FULFILLED
} from '../constants/token';

const tokenKey = String('token');

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  userToken: localStorage.getItem(tokenKey)
}, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      localStorage.removeItem(tokenKey);
      return {
        ...state,
        isFetched: false,
        userToken: null
      };
    case USER_LOGIN_FULFILLED:
      var loginToken = action.payload.body.token;
      if (loginToken) {
        localStorage.setItem(tokenKey, loginToken);
      }
      return {
        ...state,
        userToken: loginToken ? loginToken : null
      };
    case USER_REGISTER_FULFILLED:
      var registerToken = action.payload.body.token;
      if (registerToken) {
        localStorage.setItem(tokenKey, registerToken);
      }
      return {
        ...state,
        userToken: registerToken ? registerToken : null
      };
    case TOKEN_VALIDATION_PENDING:
      return {
        ...state,
        isFetched: false,
        isFetching: true,
        message: null
      };
    case TOKEN_VALIDATION_REJECTED:
      var statusCode = action.payload.response
                        ? Number(action.payload.response.statusCode)
                        : 404;
      var message = (action.payload.response)
                ?
                  (action.payload.response.body && action.payload.response.body.message)
                  ? action.payload.response.body.message
                  : action.payload.response.statusText
                : 'Failed to validate token';
      if (statusCode !== 401) {
        message = 'Failed to validate token';
      }
      localStorage.removeItem(tokenKey);
      return {
        ...state,
        isFetching: false,
        userToken: null,
        message: message
      };
    case TOKEN_VALIDATION_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true
      };
    default:
      if (action.payload && action.payload.response && action.payload.response.statusCode) {
        if (Number(action.payload.response.statusCode) === 401) {
          localStorage.removeItem(tokenKey);
          return {
            ...state,
            isFetching: false,
            isFetched: false,
            message: null,
            userToken: null
          };
        }
      }
      return state;
  }
};
