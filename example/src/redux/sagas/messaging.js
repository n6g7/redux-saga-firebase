import { fork, put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';

import { setRegistrationToken } from '../reducer/messaging.actions';

import rsf from '../rsf';

export default function*() {
  const messaging = firebase.messaging();

  const permisson = yield messaging.requestPermission();
  const token = yield messaging.getToken();

  yield put(setRegistrationToken(token));

  const messageChannel = rsf.messageChannel();
  yield takeEvery(messageChannel, function*(message) {
    console.log('You\'ve got mail!', message);
  });

  const tokenRefreshChannel = rsf.tokenRefreshChannel();
  yield takeEvery(tokenRefreshChannel, function*(token) {
    yield put(setRegistrationToken(token));
  });
}
