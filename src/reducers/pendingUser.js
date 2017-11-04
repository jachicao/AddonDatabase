import {
  PENDING_USER_NEW_PENDING,
  PENDING_USER_NEW_REJECTED,
  PENDING_USER_NEW_FULFILLED,
  PENDING_USER_TYPE_ENUM_PENDING,
  PENDING_USER_TYPE_ENUM_REJECTED,
  PENDING_USER_TYPE_ENUM_FULFILLED,
  PENDING_USER_REMOVE_TOKEN
} from '../constants/pendingUser';

export default (state = {
  message: null,
  enumIsFetching: false,
  enumIsFetched: false,
  enum: [],
  isFetching: false,
  isFetched: false,
  token: null
}, action) => {
  switch (action.type) {
    case PENDING_USER_NEW_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case PENDING_USER_NEW_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to submit user'
      };
    case PENDING_USER_NEW_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        token: action.payload.body,
        message: 'Successfully submitted'
      };
    case PENDING_USER_TYPE_ENUM_PENDING:
      return {
        ...state,
        enumIsFetching: true,
        enumIsFetched: false,
        message: null
      };
    case PENDING_USER_TYPE_ENUM_REJECTED:
      return {
        ...state,
        enumIsFetching: false,
        message: 'Failed to get type enum'
      };
    case PENDING_USER_TYPE_ENUM_FULFILLED:
      return {
        ...state,
        enumIsFetching: false,
        enumIsFetched: true,
        enum: action.payload.body
      };
    case PENDING_USER_REMOVE_TOKEN:
      return {
        ...state,
        enumIsFetching: false,
        enumIsFetched: false,
        token: null
      };
    default:
      return state;
  }
};
