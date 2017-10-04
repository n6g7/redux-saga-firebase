import { call } from 'redux-saga/effects'

function * getDoc (collectionRef, docRef) {
  const doc = this._getCollection(collectionRef, 'firestore').doc(docRef)
  console.log('COLLECTION', collectionRef, 'DOC', docRef);
  const result = yield call([doc, doc.get])
  console.log('RESULT', result);
  console.log('DATA', result.data());

  return result.data()
}

export default {
  getDoc
}
