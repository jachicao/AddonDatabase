//@flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import recaptcha from './recaptcha';
import snackbar from './snackbar';
import token from './token';
import user from './user';
import champion from './champion';
import pendingAddonSubmit from './pendingAddonSubmit';
import pendingAddonList from './pendingAddonList';
import addon from './addon';
import addonCategory from './addonCategory';
import addonLibrary from './addonLibrary';
import addonStatus from './addonStatus';
import addonType from './addonType';
import addonUtility from './addonUtility';
import session from './session';
import pendingUser from './pendingUser';
import feathers from './feathers';


export default combineReducers({
  recaptcha: recaptcha,
  snackbar: snackbar,
  token: token,
  user: user,
  champion: champion,
  pendingAddonList: pendingAddonList,
  pendingAddonSubmit: pendingAddonSubmit,
  addon: addon,
  addonCategory: addonCategory,
  addonLibrary: addonLibrary,
  addonStatus: addonStatus,
  addonType: addonType,
  addonUtility: addonUtility,
  session: session,
  pendingUser: pendingUser,
  feathers: feathers,
  routing: routerReducer
});
