import { combineReducers } from 'redux';

import login from './login';
import messaging from './messaging';
import todos from './todos';

export default combineReducers({
  login,
  messaging,
  todos,
});
