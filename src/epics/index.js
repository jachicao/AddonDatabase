import { combineEpics } from 'redux-observable';

import messages from './messages';

export default combineEpics(
  messages
);
