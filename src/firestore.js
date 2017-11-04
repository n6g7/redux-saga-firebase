import { eventChannel } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'

import { noop, syncChannel } from './utils'

function * addDocument (collectionRef, data) {
  const collection = this._getCollection(collectionRef)
  return yield call([collection, collection.add], data)
}

function channel (pathOrRef, type = 'collection') {
  const ref = type === 'collection'
    ? this._getCollection(pathOrRef)
    : this._getDocument(pathOrRef)

  const channel = eventChannel(emit => {
    const unsubscribe = ref.onSnapshot(emit)

    // Returns unsubscribe function
    return unsubscribe
  })

  return channel
}

function * deleteDocument (documentRef) {
  const doc = this._getDocument(documentRef)
  return yield call([doc, doc.delete])
}

function * getCollection (collectionRef) {
  const collection = this._getCollection(collectionRef)
  return yield call([collection, collection.get])
}

function * getDocument (documentRef) {
  const doc = this._getDocument(documentRef)
  return yield call([doc, doc.get])
}

function * setDocument (documentRef, data, options) {
  const doc = this._getDocument(documentRef)
  return yield call([doc, doc.set], data, options)
}

function * updateDocument (documentRef, ...args) {
  const doc = this._getDocument(documentRef)
  return yield call([doc, doc.update], ...args)
}

function * syncCollection (pathOrRef, successActionCreator, transform = noop) {
  const channel = yield call(this.firestore.channel, pathOrRef, 'collection')
  yield fork(syncChannel, channel, successActionCreator, transform)
}

function * syncDocument (pathOrRef, successActionCreator, transform = noop) {
  const channel = yield call(this.firestore.channel, pathOrRef, 'document')
  yield fork(syncChannel, channel, successActionCreator, transform)
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
