import { combineReducers } from 'redux'
import { reducer as login } from 'rsf-auth'

import messaging from './messaging'
import storage from './storage'
import todos from './todos'

export default combineReducers({
  login,
  messaging,
  storage,
  todos
})
