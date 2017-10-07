import { call } from 'redux-saga/effects'

function * getDoc (collectionRef, docRef) {
  const doc = this._getCollection(collectionRef).doc(docRef)
  return yield call([doc, doc.get])
}

function * getCollection (collectionRef) {
  const collection = this._getCollection(collectionRef)
  return yield call([collection, collection.get])
}

export default {
  getDoc,
  getCollection
}
