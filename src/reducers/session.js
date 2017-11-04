import {
  SESSION_HWID_FULFILLED
} from '../constants/session';

export default (state = {
  hwid: null
}, action) => {
  switch (action.type) {
    case SESSION_HWID_FULFILLED:
      return {
        ...state,
        hwid: action.payload.hwid
      };
    default:
      return state;
  }
}
