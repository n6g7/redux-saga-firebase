import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { types, setFileURL } from '@actions/storage'

import rsf from '../rsf'

const filePath = 'test.png'

function * syncFileUrl () {
  try {
    const url = yield call(rsf.storage.getDownloadURL, filePath)
    yield put(setFileURL(url))
  } catch (error) {
    console.error(error)
  }
}

function * sendFileSaga (action) {
  const file = yield select(state => state.storage.file)
  const task = rsf.storage.uploadFile(filePath, file)

  task.on('state_changed', snapshot => {
    const pct = snapshot.bytesTransferred * 100 / snapshot.totalBytes
    console.log(`${pct}%`)
  })

  // Wait for upload to complete
  yield task

  yield call(syncFileUrl)
}

export default function * rootSaga () {
  yield all([
    takeEvery(types.SEND_FILE, sendFileSaga)
  ])

  yield call(syncFileUrl)
}
