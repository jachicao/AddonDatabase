import {
  SNACKBAR_MESSAGE,
  SNACKBAR_MESSAGE_DONE
} from '../constants/snackbar';

export default (state = {
  message: null
}, action) => {
  switch (action.type) {
    case SNACKBAR_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      };
    case SNACKBAR_MESSAGE_DONE:
      return {
        ...state,
        message: null
      };
    default:
      return state;
  }
}
