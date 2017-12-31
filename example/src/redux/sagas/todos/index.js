import { fork, put, takeLatest } from 'redux-saga/effects'

import { setFirestore, types } from '@actions/todos'

import firestore from './firestore'
import realtime from './realtime'

function * syncTodosSaga ({ useFirestore }) {
  if (useFirestore) yield fork(firestore)
  else yield fork(realtime)
}

export default function * todosSaga () {
  // Only run one of {realtime,firestore}SyncSaga at a time
  yield takeLatest(types.TODOS.SET_FIRESTORE, syncTodosSaga)

  // Start with realtime
  yield put(setFirestore(false))
}
