import { fork, put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';

import { setRegistrationToken } from '../reducer/messaging.actions';

import rsf from '../rsf';

function* requestPermissionSaga() {
  const messaging = firebase.messaging();

  try {
    yield messaging.requestPermission();
    const token = yield messaging.getToken();
    yield put(setRegistrationToken(token));
  } catch(error) {
    console.warn('Notifications blocked')
  }
}

function* messageHandlerSaga() {
  const messageChannel = rsf.messaging.channel();

  yield takeEvery(messageChannel, function*(message) {
    console.log('You\'ve got mail!', message);
  });
}

function* tokenRefreshSaga() {
  const tokenRefreshChannel = rsf.messaging.tokenRefreshChannel();

  yield takeEvery(tokenRefreshChannel, function*(token) {
    yield put(setRegistrationToken(token));
  });
}

export default function*() {
  yield requestPermissionSaga()

  yield [
    messageHandlerSaga,
    tokenRefreshSaga
  ]
}
