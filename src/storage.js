import { call } from 'redux-saga/effects'

function uploadFile (pathOrRef, file, metadata) {
  const ref = this._getRef(pathOrRef, 'storage')
  const task = ref.put(file, metadata)

  return task
}

function uploadString (pathOrRef, string, format, metadata) {
  const ref = this._getRef(pathOrRef, 'storage')
  const task = ref.putString(string, format, metadata)

  return task
}

function * getDownloadURL (pathOrRef) {
  const ref = this._getRef(pathOrRef, 'storage')
  const url = yield call([ref, ref.getDownloadURL])

  return url
}

function * getFileMetadata (pathOrRef) {
  const ref = this._getRef(pathOrRef, 'storage')
  const metadata = yield call([ref, ref.getMetadata])

  return metadata
}

function * updateFileMetadata (pathOrRef, newMetadata) {
  const ref = this._getRef(pathOrRef, 'storage')
  const metadata = yield call([ref, ref.updateMetadata], newMetadata)

  return metadata
}

function * deleteFile (pathOrRef) {
  const ref = this._getRef(pathOrRef, 'storage')
  yield call([ref, ref.delete])
}

export default {
  uploadFile,
  uploadString,
  getDownloadURL,
  getFileMetadata,
  updateFileMetadata,
  deleteFile
}
