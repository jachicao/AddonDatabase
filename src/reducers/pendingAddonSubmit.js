import {
  PENDING_ADDON_SUBMIT_PENDING,
  PENDING_ADDON_SUBMIT_REJECTED,
  PENDING_ADDON_SUBMIT_FULFILLED,
} from '../constants/pendingAddon';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null
}, action) => {
  switch (action.type) {
    case PENDING_ADDON_SUBMIT_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case PENDING_ADDON_SUBMIT_REJECTED:
      return {
        ...state,
        isFetching: false,
        message:  (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to submit'
      };
    case PENDING_ADDON_SUBMIT_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: 'Successfully added'
      };
    default:
      return state;
  }
};
