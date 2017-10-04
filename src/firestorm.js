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
  const addRequest = yield call([collectionRef,collectionRef.add], data)
  addRequest
  .then(docRef=>docRef.id)
  .catch(err=>err)
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
  const setRequest = yield call([docRef,docRef.set], data,{merge:merge})
  return setRequest
  .then(()=> true) // Document Set Success
  .catch(err=>err);
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
  const updateRequest = yield call([docRef,docRef.update], data)
  return updateRequest
    .then(()=>true) // Document Update Success
    .catch(err=>err);
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
  const getRequest = yield call([docRef, docRef.get])
  return getRequest
  .then(doc=> !doc.exists ? false : doc.data()) // Handle non-existent document or else return document
  .catch(err=>err);
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
  const getRequest = yield call([collectionRef, collectionRef.get])
  return getRequest.then(querySnapshot => querySnapshot.map(doc => doc.data())) // Transform database snapshot into data
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
  const collectionRef = this._getCollection(collection, 'firestore')
  if(filters.limit) collectionRef.limit(filter.limit)
  if(filters.paginate.startAfter) collectionRef.startAt(filters.paginate.startAfter)
  if(filters.paginate.startAt) collectionRef.startAt(filters.paginate.startAt)
  if(filters.paginate.endAt) collectionRef.endAt(filters.paginate.endAt)
  if(filters.paginate.endBefore) collectionRef.endBefore(filters.paginate.endBefore)
  if(filters.orderBy) filters.orderBy.forEach( orderBy => collectionRef.orderBy(orderBy))
  if(filters.where) filters.where.forEach( where => collectionRef.where(...where))
  const getRequest = yield call([collectionRef, collectionRef.get])
  return getRequest
  .then(querySnapshot => querySnapshot.map(doc => doc.data()))
  .catch(err=>err)
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
  const deleteRequest = yield call([docRef,docRef.delete])
  return deleteRequest
  .then(()=> true) // Document Delete Success
  .catch(err=>err);
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
  const docRef = this._getCollectionDocument(collection,document, 'firestore')
  fields.map(field=>({[field]:firebase.firestore.FieldValue.delete()}))
  const updateRequest = yield call([docRef,docRef.update], fields)
  return updateRequest
  .then(()=> true) // Document Fields Delete Confirmed
  .catch(err=>err);
}