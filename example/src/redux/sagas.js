import firebase from 'firebase';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
  types,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser,
} from './actions';
import ReduxSagaFirebase from '../../../src/index';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSTkbHZIcJluamfb69ShSHXn8351H9Vm0",
  authDomain: "redux-saga-firebase.firebaseapp.com",
  databaseURL: "https://redux-saga-firebase.firebaseio.com",
});
const authProvider = new firebase.auth.GoogleAuthProvider();

const rsf = new ReduxSagaFirebase(firebaseApp);

function* loginSaga() {
  try {
    const data = yield call(rsf.login, authProvider);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga() {
  try {
    const data = yield call(rsf.logout);
    yield put(logoutSuccess(data));
  }
  catch(error) {
    yield put(logoutFailure(error));
  }
}

function* syncUserSaga() {
  const channel = yield call(rsf.authChannel);

  while(true) {
    const { error, user } = yield take(channel);

    if (user) yield put(syncUser(user.displayName));
    else yield put(syncUser('none'));
  }
}

export default function* rootSaga() {
  yield fork(syncUserSaga);
  yield [
    takeEvery(types.LOGIN.REQUEST, loginSaga),
    takeEvery(types.LOGOUT.REQUEST, logoutSaga),
  ];
}
