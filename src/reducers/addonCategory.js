import {
  ADDON_ENUM_CATEGORY_PENDING,
  ADDON_ENUM_CATEGORY_REJECTED,
  ADDON_ENUM_CATEGORY_FULFILLED
} from '../constants/addonCategory';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  enum: []
}, action) => {
  switch (action.type) {
    case ADDON_ENUM_CATEGORY_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case ADDON_ENUM_CATEGORY_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get category enum'
      };
    case ADDON_ENUM_CATEGORY_FULFILLED:
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
