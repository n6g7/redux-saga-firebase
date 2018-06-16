import { buffers, eventChannel } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'

import assert from './assert'
import { syncChannel } from './utils'

export const getCollectionRef = (rsf, pathOrRef) => {
  assert(
    !!rsf.app.firestore,
    "Firestore isn't installed. " +
    "Did you forget to `import '@firebase/firestore'`? " +
    'See https://n6g7.github.io/redux-saga-firebase/ for more information.'
  )

  return typeof pathOrRef === 'string'
    ? rsf.app.firestore().collection(pathOrRef)
    : pathOrRef
}

export const getDocumentRef = (rsf, pathOrRef) => {
  assert(
    !!rsf.app.firestore,
    "Firestore isn't installed. " +
    "Did you forget to `import '@firebase/firestore'`? " +
    'See https://n6g7.github.io/redux-saga-firebase/ for more information.'
  )

  return typeof pathOrRef === 'string'
    ? rsf.app.firestore().doc(pathOrRef)
    : pathOrRef
}

function * addDocument (collectionRef, data) {
  const collection = getCollectionRef(this, collectionRef)
  return yield call([collection, collection.add], data)
}

function channel (pathOrRef, type = 'collection', buffer = buffers.none()) {
  const ref = type === 'collection'
    ? getCollectionRef(this, pathOrRef)
    : getDocumentRef(this, pathOrRef)

  const channel = eventChannel(emit => {
    const unsubscribe = ref.onSnapshot(emit)

    // Returns unsubscribe function
    return unsubscribe
  }, buffer)

  return channel
}

function * deleteDocument (documentRef) {
  const doc = getDocumentRef(this, documentRef)
  return yield call([doc, doc.delete])
}

function * getCollection (collectionRef) {
  const collection = getCollectionRef(this, collectionRef)
  return yield call([collection, collection.get])
}

function * getDocument (documentRef) {
  const doc = getDocumentRef(this, documentRef)
  return yield call([doc, doc.get])
}

function * setDocument (documentRef, data, options) {
  const doc = getDocumentRef(this, documentRef)
  return yield call([doc, doc.set], data, options)
}

function * updateDocument (documentRef, ...args) {
  const doc = getDocumentRef(this, documentRef)
  // @ts-ignore
  return yield call([doc, doc.update], ...args)
}

function * syncCollection (pathOrRef, options) {
  const channel = yield call(this.firestore.channel, pathOrRef, 'collection')
  yield fork(syncChannel, channel, options)
}

function * syncDocument (pathOrRef, options) {
  const channel = yield call(this.firestore.channel, pathOrRef, 'document')
  yield fork(syncChannel, channel, options)
}

export default {
  addDocument,
  channel,
  deleteDocument,
  getCollection,
  getDocument,
  setDocument,
  syncCollection,
  syncDocument,
  updateDocument
}
