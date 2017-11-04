//@flow
import {
  SESSION_HWID_FULFILLED
} from '../constants/session';

export const hwidFulfilled = (hwid: string) => {
  return {
    type: SESSION_HWID_FULFILLED,
    payload: {
      hwid: hwid
    }
  };
}
