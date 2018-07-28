import firebase from 'firebase'
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'

import {
  types,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure
} from '@actions/login'

import rsf from '../rsf'

const authProvider = new firebase.auth.GoogleAuthProvider()

function * loginSaga () {
  try {
    yield call(rsf.auth.signInWithPopup, authProvider)
    // successful login will trigger the loginStatusWatcher, which will update the state
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function * logoutSaga () {
  try {
    yield call(rsf.auth.signOut)
    // successful logout will trigger the loginStatusWatcher, which will update the state
  } catch (error) {
    yield put(logoutFailure(error))
  }
}

function * loginStatusWatcher () {
  // events on this channel fire when the user logs in or logs out
  const channel = yield call(rsf.auth.channel)

  while (true) {
    const { user } = yield take(channel)

    if (user) yield put(loginSuccess(user))
    else yield put(logoutSuccess())
  }
}

export default function * loginRootSaga () {
  yield fork(loginStatusWatcher)
  yield all([
    takeEvery(types.LOGIN.REQUEST, loginSaga),
    takeEvery(types.LOGOUT.REQUEST, logoutSaga)
  ])
}
