import { all, call, select, takeEvery } from 'redux-saga/effects'
import { types } from '@actions/todos'

import rsf from '../rsf'

function* ping(action) {
  const newTodo = yield select(state => state.todos.new)
  const registrationToken = yield select(state => state.messaging.token)
  const { pong } = yield call(rsf.functions.call, 'ping', {
    ping: newTodo,
    token: registrationToken,
  })

  console.log('pong:', pong)
}

export default function* functionRootSaga() {
  yield all([takeEvery(types.TODOS.NEW.SAVE, ping)])
}
