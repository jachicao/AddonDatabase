import {
  ADDON_ENUM_STATUS_PENDING,
  ADDON_ENUM_STATUS_REJECTED,
  ADDON_ENUM_STATUS_FULFILLED
} from '../constants/addonStatus';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  enum: []
}, action) => {
  switch (action.type) {
    case ADDON_ENUM_STATUS_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case ADDON_ENUM_STATUS_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get status enum'
      };
    case ADDON_ENUM_STATUS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        enum: action.payload.body
      };
    default:
      return state;
  }
};
