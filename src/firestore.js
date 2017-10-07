import { call } from 'redux-saga/effects';

function _getCollection(pathOrRef) {
  return typeof pathOrRef === 'string'
    ? this.app.firestore().collection(pathOrRef)
    : pathOrRef;
}

function* getDoc(collectionRef, docRef) {
  const doc = this._getCollection(collectionRef).doc(docRef);
  const result = yield call([doc, doc.get]);

  return result.data();
}

function* getCollection(collectionRef) {
  const collection = this._getCollection(collectionRef);
  const querySnapshot = yield call([collection, collection.get]);

  return querySnapshot;
}

export default {
  getDoc,
  getCollection,
};
