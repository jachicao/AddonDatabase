import {
  ADDON_ENUM_UTILITY_PENDING,
  ADDON_ENUM_UTILITY_REJECTED,
  ADDON_ENUM_UTILITY_FULFILLED
} from '../constants/addonUtility';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  enum: []
}, action) => {
  switch (action.type) {
    case ADDON_ENUM_UTILITY_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case ADDON_ENUM_UTILITY_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get utility enum'
      };
    case ADDON_ENUM_UTILITY_FULFILLED:
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
