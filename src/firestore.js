import { call } from 'redux-saga/effects'

function * addDocument (collectionRef, data) {
  const collection = this._getCollection(collectionRef)
  return yield call([collection, collection.add], data)
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

export default {
  addDocument,
  deleteDocument,
  getCollection,
  getDocument,
  setDocument,
  updateDocument
}
