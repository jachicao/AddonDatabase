import {
  CHAMPION_LIST_PENDING,
  CHAMPION_LIST_REJECTED,
  CHAMPION_LIST_FULFILLED,
} from '../constants/champion';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  list: []
}, action) => {
  switch (action.type) {
    case CHAMPION_LIST_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case CHAMPION_LIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        message: 'Failed to get champions'
      };
    case CHAMPION_LIST_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        list: action.payload.body
      };
    default:
      return state;
  }
};
