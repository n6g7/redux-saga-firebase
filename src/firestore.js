import { eventChannel } from 'redux-saga'
import { call, cancelled, put, take } from 'redux-saga/effects'

/**
 * @func documentAdd
 * @param {String} collection 
 * @param {Object} data 
 * @desc Add document to collection, after passing data from Frontend to Backend(Firestore).
 * @resource https://firebase.google.com/docs/firestore/manage-data/add-data
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#add
 * @return {String} auto-generated document ID
 */
function * documentAdd(collection, data)
{
  const collectionRef = this._getCollection(collection, 'firestore')
  console.log(collectionRef)
  return yield call([collectionRef,collectionRef.add], data)
}

/**
 * @func documentEmptyAdd
 * @param {String} collection 
 * @desc Add document to collection and return auto-generated key.
 * @resource https://firebase.google.com/docs/firestore/manage-data/add-data
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#doc
 * @return {String} auto-generated document ID
 */
function * documentEmptyAdd(collection)
{
  const collectionRef = this._getCollection(collection, 'firestore')
  return yield call([collectionRef,collectionRef.doc]) // Auto-generated ID
}

/**
 * @func documentSet
 * @param {String} collection
 * @param {String} document
 * @param {Object} data
 * @param {Boolean} merge
 * @desc Edit document, passing data object from Frontend, overwriting or merging with the existing data structure in the Backend(Firestore)
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#set
 */
function * documentSet(collection, document, data, merge=false)
{
  const docRef = this._getCollectionDocument(collection, document, 'firestore')
  return yield call([docRef,docRef.set], data,{merge:merge})
}

/**
 * @func documentUpdate
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#update
 */
function * documentUpdate(collection, document, data)
{
  const docRef = this._getCollectionDocument(collection, document, 'firestore')
  return yield call([docRef,docRef.update], data)
}

/**
 * @func documentGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 */
function * documentGet(collection, document)
{
  const docRef = this._getCollectionDocument(collection, document, 'firestore')
  const documentSnapshot = yield call([docRef, docRef.get])
  return documentSnapshot.data()
}

/**
 * @func documentAllGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 * 
 * @return {Array} All documents from collection  
 */
function * documentAllGet(collection)
{
  const collectionRef = this._getCollection(collection, 'firestore')
  const querySnapshot = yield call([collectionRef, collectionRef.get])
  return querySnapshot.docs.map(doc=>doc.data())
}

/**
 * @func documentFilterGet
 * @param {String} collection 
 * @param {Object} filters
 * @param {String/Number} filters.startAfter
 * @param {String/Number} filters.startAt
 * @param {String/Number} filters.endAt
 * @param {String/Number} filters.endBefore
 * @param {Array} filters.orderBy
 * @param {Array} filters.where
 * 
 * @resource https://firebase.google.com/docs/firestore/query-data/queries
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 * 
 * * @return {Array} Filtered documents from collection
 */
function * documentFilterGet(collection, filters)
{
  let collectionRef = this._getCollection(collection, 'firestore')
  if(filters)
  {
    if(filters.limit) collectionRef = collectionRef.limit(filters.limit)
    if(filters.orderBy) filters.orderBy.forEach( orderBy => collectionRef = collectionRef.orderBy(orderBy))
    if (filters.paginate) {
      if(filters.paginate.startAfter) collectionRef = collectionRef.startAfter(filters.paginate.startAfter)
      if(filters.paginate.startAt) collectionRef = collectionRef.startAt(filters.paginate.startAt)
      if(filters.paginate.endAt) collectionRef = collectionRef.endAt(filters.paginate.endAt)
      if(filters.paginate.endBefore) collectionRef = collectionRef.endBefore(filters.paginate.endBefore)
    }
    if(filters.where)  filters.where.forEach( where => collectionRef = collectionRef.where(...where))
  }
  const querySnapshot = yield call([collectionRef, collectionRef.get])
  return querySnapshot.docs.map(doc=>doc.data())
}

/**
 * @func documentDelete
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete
 */
function * documentDelete(collection, document)
{
  const docRef = this._getCollectionDocument(collection,document, 'firestore')
  return yield call([docRef,docRef.delete])
}

/**
 * @func documentFieldsDelete
 * @param {String} collection 
 * @param {String} document 
 * @param {Array} fields 
 * 
 * @desc Delete an array of document fields
 */
function * documentFieldsDelete(collection, document, fields)
{
  const firestore = this.app.firestore()
  const fieldsDelete = {}
  console.log(firestore)
  const docRef = yield this._getCollectionDocument(collection,document, 'firestore')
  console.log(docRef)
  fields.forEach(field=>(fieldsDelete[field] = firestore.FieldValue.delete()))
  return yield call([docRef,docRef.update], fields)
}

export default {
  documentAdd,
  documentEmptyAdd,
  documentSet,
  documentUpdate,
  documentGet,
  documentAllGet,
  documentFilterGet,
  documentDelete,
  documentFieldsDelete
}