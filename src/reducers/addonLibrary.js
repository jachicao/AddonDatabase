import {
  ADDON_ENUM_LIBRARY_PENDING,
  ADDON_ENUM_LIBRARY_REJECTED,
  ADDON_ENUM_LIBRARY_FULFILLED
} from '../constants/addonLibrary';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  enum: []
}, action) => {
  switch (action.type) {
    case ADDON_ENUM_LIBRARY_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case ADDON_ENUM_LIBRARY_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get library enum'
      };
    case ADDON_ENUM_LIBRARY_FULFILLED:
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
