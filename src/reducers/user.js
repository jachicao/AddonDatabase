import {
  USER_REGISTER_PENDING,
  USER_REGISTER_REJECTED,
  USER_REGISTER_FULFILLED,
  USER_LOGIN_PENDING,
  USER_LOGIN_REJECTED,
  USER_LOGIN_FULFILLED,
  USER_LOGOUT
} from '../constants/user';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null
}, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        message: 'Successfully logged out'
      };
    case USER_LOGIN_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case USER_LOGIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to login'
      };
    case USER_LOGIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: 'Successfully logged in'
      };
    case USER_REGISTER_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case USER_REGISTER_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to register'
      };
    case USER_REGISTER_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: 'Successfully registered',
      };
    default:
      return state;
  }
};
