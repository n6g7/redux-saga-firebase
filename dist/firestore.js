'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [documentAdd, documentEmptyAdd, documentSet, documentUpdate, documentGet, documentAllGet, documentFilterGet, documentDelete, documentFieldsDelete].map(_regenerator2.default.mark);

/**
 * @func documentAdd
 * @param {String} collection 
 * @param {Object} data 
 * @desc Add document to collection, after passing data from Frontend to Backend(Firestore).
 * @resource https://firebase.google.com/docs/firestore/manage-data/add-data
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#add
 * @return {String} auto-generated document ID
 */
function documentAdd(collection, data) {
  var collectionRef;
  return _regenerator2.default.wrap(function documentAdd$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          collectionRef = this._getCollection(collection, 'firestore');

          console.log(collectionRef);
          _context.next = 4;
          return (0, _effects.call)([collectionRef, collectionRef.add], data);

        case 4:
          return _context.abrupt('return', _context.sent);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

/**
 * @func documentEmptyAdd
 * @param {String} collection 
 * @desc Add document to collection and return auto-generated key.
 * @resource https://firebase.google.com/docs/firestore/manage-data/add-data
 * @resource https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#doc
 * @return {String} auto-generated document ID
 */
function documentEmptyAdd(collection) {
  var collectionRef;
  return _regenerator2.default.wrap(function documentEmptyAdd$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          collectionRef = this._getCollection(collection, 'firestore');
          _context2.next = 3;
          return (0, _effects.call)([collectionRef, collectionRef.doc] // Auto-generated ID
          );

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
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
function documentSet(collection, document, data) {
  var merge = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var docRef;
  return _regenerator2.default.wrap(function documentSet$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          docRef = this._getCollectionDocument(collection, document, 'firestore');
          _context3.next = 3;
          return (0, _effects.call)([docRef, docRef.set], data, { merge: merge });

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

/**
 * @func documentUpdate
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#update
 */
function documentUpdate(collection, document, data) {
  var docRef;
  return _regenerator2.default.wrap(function documentUpdate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          docRef = this._getCollectionDocument(collection, document, 'firestore');
          _context4.next = 3;
          return (0, _effects.call)([docRef, docRef.update], data);

        case 3:
          return _context4.abrupt('return', _context4.sent);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

/**
 * @func documentGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 */
function documentGet(collection, document) {
  var docRef, documentSnapshot;
  return _regenerator2.default.wrap(function documentGet$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          docRef = this._getCollectionDocument(collection, document, 'firestore');
          _context5.next = 3;
          return (0, _effects.call)([docRef, docRef.get]);

        case 3:
          documentSnapshot = _context5.sent;
          return _context5.abrupt('return', { id: documentSnapshot.id, data: documentSnapshot.data() });

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

/**
 * @func documentAllGet
 * @param {String} collection 
 * @param {String} document 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
 * 
 * @return {Array} All documents from collection  
 */
function documentAllGet(collection) {
  var collectionRef, querySnapshot;
  return _regenerator2.default.wrap(function documentAllGet$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          collectionRef = this._getCollection(collection, 'firestore');
          _context6.next = 3;
          return (0, _effects.call)([collectionRef, collectionRef.get]);

        case 3:
          querySnapshot = _context6.sent;
          return _context6.abrupt('return', querySnapshot.docs.map(function (doc) {
            return { id: doc.id, data: doc.data() };
          }));

        case 5:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
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
function documentFilterGet(collection, filters) {
  var collectionRef, querySnapshot;
  return _regenerator2.default.wrap(function documentFilterGet$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          collectionRef = this._getCollection(collection, 'firestore');

          if (filters) {
            if (filters.limit) collectionRef = collectionRef.limit(filters.limit);
            if (filters.orderBy) filters.orderBy.forEach(function (orderBy) {
              return collectionRef = collectionRef.orderBy(orderBy);
            });
            if (filters.paginate) {
              if (filters.paginate.startAfter) collectionRef = collectionRef.startAfter(filters.paginate.startAfter);
              if (filters.paginate.startAt) collectionRef = collectionRef.startAt(filters.paginate.startAt);
              if (filters.paginate.endAt) collectionRef = collectionRef.endAt(filters.paginate.endAt);
              if (filters.paginate.endBefore) collectionRef = collectionRef.endBefore(filters.paginate.endBefore);
            }
            if (filters.where) filters.where.forEach(function (where) {
              var _collectionRef;

              return collectionRef = (_collectionRef = collectionRef).where.apply(_collectionRef, (0, _toConsumableArray3.default)(where));
            });
          }
          _context7.next = 4;
          return (0, _effects.call)([collectionRef, collectionRef.get]);

        case 4:
          querySnapshot = _context7.sent;
          return _context7.abrupt('return', querySnapshot.docs.map(function (doc) {
            return { id: doc.id, data: doc.data() };
          }));

        case 6:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[6], this);
}

/**
 * @func documentDelete
 * @param {String} collection 
 * @param {String} document 
 * @param {Object} data 
 * 
 * @desc https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete
 */
function documentDelete(collection, document) {
  var docRef;
  return _regenerator2.default.wrap(function documentDelete$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          docRef = this._getCollectionDocument(collection, document, 'firestore');
          _context8.next = 3;
          return (0, _effects.call)([docRef, docRef.delete]);

        case 3:
          return _context8.abrupt('return', _context8.sent);

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked[7], this);
}

/**
 * @func documentFieldsDelete
 * @param {String} collection 
 * @param {String} document 
 * @param {Array} fields 
 * 
 * @desc Delete an array of document fields
 */
function documentFieldsDelete(collection, document, fields) {
  var firestore, fieldsDelete, docRef;
  return _regenerator2.default.wrap(function documentFieldsDelete$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          firestore = this.app.firestore();
          fieldsDelete = {};

          console.log(firestore);
          _context9.next = 5;
          return this._getCollectionDocument(collection, document, 'firestore');

        case 5:
          docRef = _context9.sent;

          console.log(docRef);
          fields.forEach(function (field) {
            return fieldsDelete[field] = firestore.FieldValue.delete();
          });
          _context9.next = 10;
          return (0, _effects.call)([docRef, docRef.update], fields);

        case 10:
          return _context9.abrupt('return', _context9.sent);

        case 11:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked[8], this);
}

exports.default = {
  documentAdd: documentAdd,
  documentEmptyAdd: documentEmptyAdd,
  documentSet: documentSet,
  documentUpdate: documentUpdate,
  documentGet: documentGet,
  documentAllGet: documentAllGet,
  documentFilterGet: documentFilterGet,
  documentDelete: documentDelete,
  documentFieldsDelete: documentFieldsDelete
};