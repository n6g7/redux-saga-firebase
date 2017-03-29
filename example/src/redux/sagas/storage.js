import { call, put, select, takeEvery } from 'redux-saga/effects';

import { types, setFileURL } from '../reducer/storage.actions';

import rsf from '../rsf';

const filePath = 'test.png'

function* syncFileUrl() {
  const url = yield call(rsf.getDownloadURL, filePath);
  yield put(setFileURL(url));

}

function* sendFileSaga(action) {
  const file = yield select(state => state.storage.file);
  const task = yield call(rsf.upload, filePath, file);

  yield syncFileUrl();
}

export default function* rootSaga() {
  yield [
    takeEvery(types.SEND_FILE, sendFileSaga),
  ];

  yield syncFileUrl()
}
