import { fork } from 'redux-saga/effects'
import { saga as login } from 'rsf-auth'

import rsf, { authProvider } from '../rsf'

import analytics from './analytics'
import functions from './functions'
import messaging from './messaging'
import storage from './storage'
import todos from './todos'

export default function * rootSaga () {
  yield [
    fork(analytics),
    fork(functions),
    fork(login, rsf, authProvider),
    fork(messaging),
    fork(storage),
    fork(todos)
  ]
}
