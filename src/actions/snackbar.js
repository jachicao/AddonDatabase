//@flow
import {
  SNACKBAR_MESSAGE,
  SNACKBAR_MESSAGE_DONE
} from '../constants/snackbar';

export const showSnackbar = (message: string) => {
  return {
    type: SNACKBAR_MESSAGE,
    payload: {
      message: message
    }
  };
}

export const onTimeout = () => {
  return {
    type: SNACKBAR_MESSAGE_DONE,
  };
}
