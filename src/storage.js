import { call } from 'redux-saga/effects'

export const getRef = (rsf, pathOrRef) => {
  return typeof pathOrRef === 'string'
    ? rsf.app.storage().ref(pathOrRef)
    : pathOrRef
}

function uploadFile (pathOrRef, file, metadata) {
  const ref = getRef(this, pathOrRef, 'storage')
  const task = ref.put(file, metadata)

  return task
}

function uploadString (pathOrRef, string, format, metadata) {
  const ref = getRef(this, pathOrRef, 'storage')
  const task = ref.putString(string, format, metadata)

  return task
}

function * getDownloadURL (pathOrRef) {
  const ref = getRef(this, pathOrRef, 'storage')
  const url = yield call([ref, ref.getDownloadURL])

  return url
}

function * getFileMetadata (pathOrRef) {
  const ref = getRef(this, pathOrRef, 'storage')
  const metadata = yield call([ref, ref.getMetadata])

  return metadata
}

function * updateFileMetadata (pathOrRef, newMetadata) {
  const ref = getRef(this, pathOrRef, 'storage')
  const metadata = yield call([ref, ref.updateMetadata], newMetadata)

  return metadata
}

function * deleteFile (pathOrRef) {
  const ref = getRef(this, pathOrRef, 'storage')
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
