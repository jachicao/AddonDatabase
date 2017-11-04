import {
  RECAPTCHA_PUBLIC_KEY_PENDING,
  RECAPTCHA_PUBLIC_KEY_REJECTED,
  RECAPTCHA_PUBLIC_KEY_FULFILLED,
  RECAPTCHA_RESPONSE,
  RECAPTCHA_RESPONSE_RESET,
  RECAPTCHA_RESET,
  RECAPTCHA_RESET_DONE
} from '../constants/recaptcha';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  publicKey: null,
  response: null,
  reset: false
}, action) => {
  switch (action.type) {
    case RECAPTCHA_PUBLIC_KEY_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null,
        response: null
      };
    case RECAPTCHA_PUBLIC_KEY_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get recaptcha key'
      };
    case RECAPTCHA_PUBLIC_KEY_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: null,
        publicKey: action.payload.body
      };
    case RECAPTCHA_RESPONSE:
      return {
        ...state,
        response: action.payload.response
      };
    case RECAPTCHA_RESPONSE_RESET:
      return {
        ...state,
        response: null
      };
    case RECAPTCHA_RESET:
      return {
        ...state,
        response: null,
        reset: true
      };
    case RECAPTCHA_RESET_DONE:
      return {
        ...state,
        reset: false
      };
    default:
      return state;
  }
};
