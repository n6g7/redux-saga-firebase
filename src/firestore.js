import { call } from 'redux-saga/effects'

function * getDoc (collectionRef, docRef) {
  const doc = this._getCollection(collectionRef, 'firestore').doc(docRef)
  const result = yield call([doc, doc.get])

  return result.data()
}

function * getCollection (collectionRef) {
  const collection = this._getCollection(collectionRef, 'firestore')
  const querySnapshot = yield call([collection, collection.get])
  let result

  querySnapshot.forEach((doc) => {
    result = {...result, [doc.id]: doc.data()}
  })

  return result
}

export default {
  getDoc,
  getCollection
}
