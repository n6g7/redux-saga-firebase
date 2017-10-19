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
function * documentAdd(branch, data)
{
  const ref = this._getBranch(branch, 'firestore')
  return yield call([ref,ref.add], data)
}

/**
 * @func documentEmptyAdd
 * @param {String} collection 
 * @desc Add document to collection and return auto-generated key.
 * @resource https://firebase.google.com/docs/firestore/manage-data/add-data
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#doc
 * @return {String} auto-generated document ID
 */
function * documentEmptyAdd(branch)
{
  const ref = this._getBranch(branch, 'firestore')
  return yield call([ref,ref.doc]) // Auto-generated ID
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
function * documentSet(branch, data, merge=false)
{
  const ref = this._getBranch(branch, 'firestore')
  return yield call([ref,ref.set], data,{merge:merge})
}

/**
 * @func documentUpdate
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#update
 */
function * documentUpdate(branch, data)
{
  const ref = this._getBranch(branch, 'firestore')
  return yield call([ref,ref.update], data)
}

/**
 * @func documentGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 */
function * documentGet(branch, document)
{
  const ref = this._getBranch(branch, 'firestore')
  console.log(ref)
  const documentSnapshot = yield call([ref, ref.get])
  return {id: documentSnapshot.id, data:documentSnapshot.data()}
}

/**
 * @func documentAllGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 * 
 * @return {Array} All documents from collection  
 */
function * documentAllGet(branch)
{
  const ref = this._getBranch(branch, 'firestore')
  const querySnapshot = yield call([ref, ref.get])
  return querySnapshot.docs.map(doc=>({id: doc.id, data:doc.data()}))
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
function * documentFilterGet(branch, filters)
{
  let ref = this._getBranch(branch, 'firestore')
  if(filters)
  {
    if(filters.limit) ref = ref.limit(filters.limit)
    if(filters.orderBy) filters.orderBy.forEach( orderBy => ref = ref.orderBy(orderBy))
    if (filters.paginate) {
      if(filters.paginate.startAfter) ref = ref.startAfter(filters.paginate.startAfter)
      if(filters.paginate.startAt) ref = ref.startAt(filters.paginate.startAt)
      if(filters.paginate.endAt) ref = ref.endAt(filters.paginate.endAt)
      if(filters.paginate.endBefore) ref = ref.endBefore(filters.paginate.endBefore)
    }
    if(filters.where)  filters.where.forEach( where => ref = ref.where(...where))
  }
  const querySnapshot = yield call([ref, ref.get])
  return querySnapshot.docs.map(doc=>({id: doc.id, data:doc.data()}))
}

/**
 * @func documentDelete
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete
 */
function * documentDelete(branch)
{
  const ref = this._getBranch(branch, 'firestore')
  return yield call([ref,ref.delete])
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
  const firestore = this.app.firestore() // Required to access Field Constructor
  const fieldsDelete = {}
  const ref = this._getBranch(branch, 'firestore')
  fields.forEach(field=>(fieldsDelete[field] = firestore.FieldValue.delete()))
  return yield call([ref,ref.update], fields)
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