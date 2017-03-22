import { combineReducers } from 'redux';

import login from './login';
import todos from './todos';

export default combineReducers({
  login,
  todos,
});
