import {
  ADDON_ENUM_TYPE_PENDING,
  ADDON_ENUM_TYPE_REJECTED,
  ADDON_ENUM_TYPE_FULFILLED
} from '../constants/addonType';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  enum: []
}, action) => {
  switch (action.type) {
    case ADDON_ENUM_TYPE_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case ADDON_ENUM_TYPE_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get type enum'
      };
    case ADDON_ENUM_TYPE_FULFILLED:
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
