import { all, fork } from 'redux-saga/effects'

import analytics from './analytics'
import functions from './functions'
import login from './login'
import messaging from './messaging'
import storage from './storage'
import todos from './todos'

export default function* rootSaga() {
  yield all([
    fork(analytics),
    fork(functions),
    fork(login),
    fork(messaging),
    fork(storage),
    fork(todos),
  ])
}
