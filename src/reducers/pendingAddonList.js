import {
  PENDING_ADDON_LIST_PENDING,
  PENDING_ADDON_LIST_REJECTED,
  PENDING_ADDON_LIST_FULFILLED,
  PENDING_ADDON_DELETE_PENDING,
  PENDING_ADDON_DELETE_REJECTED,
  PENDING_ADDON_DELETE_FULFILLED,
  PENDING_ADDON_ACCEPT_PENDING,
  PENDING_ADDON_ACCEPT_REJECTED,
  PENDING_ADDON_ACCEPT_FULFILLED,
  PENDING_ADDON_EDIT_PENDING,
  PENDING_ADDON_EDIT_REJECTED,
  PENDING_ADDON_EDIT_FULFILLED
} from '../constants/pendingAddon';

export default (state = {
  isFetching: false,
  isFetched: false,
  message: null,
  list: []
}, action) => {
  switch (action.type) {
    case PENDING_ADDON_LIST_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        message: null
      };
    case PENDING_ADDON_LIST_REJECTED:
      return {
        ...state,
        isFetching: false,
        message:  (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to get pendingAddonList'
      };
    case PENDING_ADDON_LIST_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        list: action.payload.body
      };
    case PENDING_ADDON_DELETE_PENDING:
      return {
        ...state,
        isFetching: true,
        message: null
      };
    case PENDING_ADDON_DELETE_REJECTED:
      return {
        ...state,
        isFetching: false,
        message:  (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to delete pendingAddon'
      };
    case PENDING_ADDON_DELETE_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: 'Successfully deleted',
        list: action.payload.body
      };
    case PENDING_ADDON_ACCEPT_PENDING:
      return {
        ...state,
        isFetching: true,
        message: null
      };
    case PENDING_ADDON_ACCEPT_REJECTED:
      return {
        ...state,
        isFetching: false,
        message:  (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to accept pendingAddon'
      };
    case PENDING_ADDON_ACCEPT_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: 'Successfully accepted',
        list: action.payload.body
      };
    case PENDING_ADDON_EDIT_PENDING:
      return {
        ...state,
        isFetching: true,
        message: null
      };
    case PENDING_ADDON_EDIT_REJECTED:
      return {
        ...state,
        isFetching: false,
        message:  (action.payload.response)
                  ?
                    (action.payload.response.body && action.payload.response.body.message)
                    ? action.payload.response.body.message
                    : action.payload.response.statusText
                  : 'Failed to edit pendingAddon'
      };
    case PENDING_ADDON_EDIT_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        message: 'Successfully edited',
        list: action.payload.body
      };
    default:
      return state;
  }
};
