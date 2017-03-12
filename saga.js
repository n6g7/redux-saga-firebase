import { call, put, takeEvery } from 'redux-saga/effects';

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  setCredential,
  types,
} from './actions';
import services from './services';

function* authEventSaga({ user }) {
  if (user) {
    yield put(loginSuccess({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      photoURL: user.photoURL,
      refereshToken: user.refereshToken,
      uid: user.uid,
    }));
  }
  else yield put(logoutSuccess());
}

function* loginSaga() {
  try {
    const credential = yield call(services.login);
    yield put(setCredential(credential));
  }
  catch (error) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga() {
  try {
    yield call(services.logout);
  }
  catch (error) {
    yield put(logoutFailure(error));
  }
}

export default function* reduxSagaFirebaseWatcher() {
  const authChannel = services.getEventChannel();

  yield takeEvery(authChannel, authEventSaga);
  yield takeEvery(types.LOGIN.REQUEST, loginSaga);
  yield takeEvery(types.LOGOUT.REQUEST, logoutSaga);
}
