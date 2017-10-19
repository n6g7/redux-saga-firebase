'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _firestore = require('./firestore');

var _firestore2 = _interopRequireDefault(_firestore);

var _functions = require('./functions');

var _functions2 = _interopRequireDefault(_functions);

var _messaging = require('./messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReduxSagaFirebase = function () {
  function ReduxSagaFirebase(firebaseApp) {
    (0, _classCallCheck3.default)(this, ReduxSagaFirebase);

    this.app = firebaseApp;
    this.region = 'us-central1';

    // Authentication methods
    this.auth = {
      applyActionCode: _auth2.default.applyActionCode.bind(this),
      channel: _auth2.default.channel.bind(this),
      confirmPasswordReset: _auth2.default.confirmPasswordReset.bind(this),
      createUserWithEmailAndPassword: _auth2.default.createUserWithEmailAndPassword.bind(this),
      sendEmailVerification: _auth2.default.sendEmailVerification.bind(this),
      sendPasswordResetEmail: _auth2.default.sendPasswordResetEmail.bind(this),
      signInAndRetrieveDataWithCredential: _auth2.default.signInAndRetrieveDataWithCredential.bind(this),
      signInAnonymously: _auth2.default.signInAnonymously.bind(this),
      signInWithCredential: _auth2.default.signInWithCredential.bind(this),
      signInWithCustomToken: _auth2.default.signInWithCustomToken.bind(this),
      signInWithEmailAndPassword: _auth2.default.signInWithEmailAndPassword.bind(this),
      signInWithPopup: _auth2.default.signInWithPopup.bind(this),
      signInWithPhoneNumber: _auth2.default.signInWithPhoneNumber.bind(this),
      signInWithRedirect: _auth2.default.signInWithRedirect.bind(this),
      signOut: _auth2.default.signOut.bind(this),
      updatePassword: _auth2.default.updatePassword.bind(this)

      // Database methods
    };this.database = {
      read: _database2.default.read.bind(this),
      create: _database2.default.create.bind(this),
      update: _database2.default.update.bind(this),
      patch: _database2.default.patch.bind(this),
      delete: _database2.default.delete.bind(this),
      channel: _database2.default.channel.bind(this),
      sync: _database2.default.sync.bind(this)

      // Firestore methods
    };this.firestore = {
      documentAdd: _firestore2.default.documentAdd.bind(this),
      documentEmptyAdd: _firestore2.default.documentEmptyAdd.bind(this),
      documentSet: _firestore2.default.documentSet.bind(this),
      documentUpdate: _firestore2.default.documentUpdate.bind(this),
      documentGet: _firestore2.default.documentGet.bind(this),
      documentAllGet: _firestore2.default.documentAllGet.bind(this),
      documentFilterGet: _firestore2.default.documentFilterGet.bind(this),
      documentDelete: _firestore2.default.documentDelete.bind(this),
      documentFieldsDelete: _firestore2.default.documentFieldsDelete.bind(this)

      // Functions methods
    };this.functions = {
      call: _functions2.default.call.bind(this)

      // Messaging methods
    };this.messaging = {
      channel: _messaging2.default.channel.bind(this),
      tokenRefreshChannel: _messaging2.default.tokenRefreshChannel.bind(this)

      // Storage methods
    };this.storage = {
      uploadFile: _storage2.default.uploadFile.bind(this),
      uploadString: _storage2.default.uploadString.bind(this),
      getDownloadURL: _storage2.default.getDownloadURL.bind(this),
      getFileMetadata: _storage2.default.getFileMetadata.bind(this),
      updateFileMetadata: _storage2.default.updateFileMetadata.bind(this),
      deleteFile: _storage2.default.deleteFile.bind(this)
    };
  }

  (0, _createClass3.default)(ReduxSagaFirebase, [{
    key: 'projectId',
    value: function projectId() {
      if (this._projectId) return this._projectId;

      var regex = /^([a-z0-9-]+?)(?:-[a-z0-9]{5})?\.firebaseapp\.com$/;
      var projectId = this.app.options.authDomain.match(regex)[1];

      this._projectId = projectId;

      return projectId;
    }
  }, {
    key: '_getRef',
    value: function _getRef(pathOrRef, service) {
      return typeof pathOrRef === 'string' ? this.app[service]().ref(pathOrRef) : pathOrRef;
    }
  }, {
    key: '_getCollection',
    value: function _getCollection(pathOrRef, service) {
      return typeof pathOrRef === 'string' ? this.app[service]().collection(pathOrRef) : pathOrRef;
    }
  }, {
    key: '_getCollectionDocument',
    value: function _getCollectionDocument(collectionRef, documentRef, service) {
      return typeof collectionRef === 'string' && typeof documentRef === 'string' ? this.app[service]().collection(collectionRef).doc(documentRef) : collectionRef;
    }
    /**
     * 
     * @param {Array} branches @desc Recursively access collection,document,collection,document...sub-collections
     * @param {String} service 
     */

  }, {
    key: '_getBranch',
    value: function _getBranch(branches, service) {
      var destination = this.app[service]();
      branches.forEach(function (branch) {
        var key = (0, _keys2.default)(branch)[0];
        var value = branch[key];
        destination.key(value);
      });
      console.log(destination);
      return destination;
    }
  }]);
  return ReduxSagaFirebase;
}();

exports.default = ReduxSagaFirebase;