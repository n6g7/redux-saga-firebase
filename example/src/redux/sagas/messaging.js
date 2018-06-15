import { all, put, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'

import { setRegistrationToken } from '@actions/messaging'

import rsf from '../rsf'

function * requestPermissionSaga () {
  const messaging = firebase.messaging()

  try {
    yield messaging.requestPermission()
    const token = yield messaging.getToken()
    yield put(setRegistrationToken(token))
  } catch (error) {
    console.warn('Notifications blocked')
  }
}

function * messageHandlerSaga () {
  const messageChannel = rsf.messaging.channel()

  yield takeEvery(messageChannel, function * (message) {
    console.log('You\'ve got mail!', message)
  })
}

export default function * () {
  yield requestPermissionSaga()

  yield all([
    messageHandlerSaga,
    rsf.messaging.syncToken({
      successActionCreator: setRegistrationToken
    })
  ])
}
