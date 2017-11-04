import {
  ADDONS_PENDING,
  ADDONS_REJECTED,
  ADDONS_FULFILLED,
} from '../constants/addon';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  list: []
}, action) => {
  switch (action.type) {
    case ADDONS_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case ADDONS_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get addons'
      };
    case ADDONS_FULFILLED:
      var list = action.payload.body;
      list.forEach((addon) => {
        var total = Number(addon.wins) + Number(addon.losses);
        if (total > 0) {
          addon.winRate = Math.trunc(100 * Number(addon.wins) / total);
        } else {
          addon.winRate = "Unknown"
        }
      });
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        list: list
      };
    default:
      return state;
  }
};
