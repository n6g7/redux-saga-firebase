import { eventChannel } from 'redux-saga'
import { call, cancelled, put, take } from 'redux-saga/effects'

/**
 * @func documentSet
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#update
 */
function * documentSet (collection, document, data)
{
  const docRef = this._getCollectionDocument(collection, document, 'firestorm')
  yield call([docRef,docRef.set], data)
}

/**
 * @func documentUpdate
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#update
 */
function * documentUpdate (collection, document, data)
{
  const docRef = this._getCollectionDocument(collection, document, 'firestorm')
  const status = yield call([docRef,docRef.update], data)
  return status
    .then(()=>true)
    .catch(err=>err);
}

/**
 * @func documentGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 */
function * documentGet (collection, document)
{
  const docRef = this._getCollectionDocument(collection, document, 'firestorm')
  const result = yield call([docRef, docRef.get])

  return result
  .then(doc=> 
  {
    if(!doc.exists) return false
    return doc.data()
  })
  .catch(err=>err);
}

/**
 * @func documentAllGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 */
function * documentAllGet (collection, document)
{
  const collectionRef = this._getCollection(collection, 'firestorm')
  const data = yield call([collectionRef, collectionRef.get])
  const result = yield data.then(querySnapshot => querySnapshot.map(doc => doc.data()))
  return result
}

/**
 * @func documentFilterGet
 * @param {String} collection 
 * @param {Object} filters
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 */
function * documentFilterGet (collection, filters)
{
  const docRef = this._getCollection(collection, 'firestorm')
  if(filters.limit) docRef.limit(filter.limit)
  if(filters.paginate.startAfter) docRef.startAt(filters.paginate.startAfter)
  if(filters.paginate.startAt) docRef.startAt(filters.paginate.startAt)
  if(filters.paginate.endAt) docRef.endAt(filters.paginate.endAt)
  if(filters.paginate.endBefore) docRef.endBefore(filters.paginate.endBefore)
  if(filters.orderBy) filters.orderBy.forEach( orderBy => docRef.orderBy(orderBy))
  if(filters.where) filters.where.forEach( where => docRef.where(...where))
  const result = yield data.then(querySnapshot => querySnapshot.map(doc => doc.data()))
  return result
}

/**
 * @func documentDelete
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#update
 */
function * documentDelete (collection, document, data)
{
  const docRef = this._getCollectionDocument(collection,document, 'firestorm')
  const status = yield call([docRef,docRef.delete])
  return status
  .then(()=> true) // Document Delete Confirmed
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
function * documentFieldsDelete (collection, document, fields)
{
  const docRef = this._getCollectionDocument(collection,document, 'firestorm')
  fields.map(field=>({[field]:firebase.firestore.FieldValue.delete()}))
  const status = yield call([docRef,docRef.update], fields)
  return status
  .then(()=> true) // Document Fields Delete Confirmed
  .catch(err=>err);
}