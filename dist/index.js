'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

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
    this.signInAnonymously = _auth2.default.signInAnonymously.bind(this);
    this.signInWithPopup = _auth2.default.signInWithPopup.bind(this);
    this.logout = _auth2.default.logout.bind(this);
    this.authChannel = _auth2.default.authChannel.bind(this);

    // Database methods
    this.get = _database2.default.get.bind(this);
    this.create = _database2.default.create.bind(this);
    this.update = _database2.default.update.bind(this);
    this.patch = _database2.default.patch.bind(this);
    this.delete = _database2.default.delete.bind(this);
    this.channel = _database2.default.channel.bind(this);

    // Functions methods
    this.call = _functions2.default.call.bind(this);

    // Messaging methods
    this.messageChannel = _messaging2.default.messageChannel.bind(this);
    this.tokenRefreshChannel = _messaging2.default.tokenRefreshChannel.bind(this);

    // Storage methods
    this.upload = _storage2.default.upload.bind(this);
    this.uploadString = _storage2.default.uploadString.bind(this);
    this.getDownloadURL = _storage2.default.getDownloadURL.bind(this);
    this.getFileMetadata = _storage2.default.getFileMetadata.bind(this);
    this.updateFileMetadata = _storage2.default.updateFileMetadata.bind(this);
    this.deleteFile = _storage2.default.deleteFile.bind(this);
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
  }]);
  return ReduxSagaFirebase;
}();

exports.default = ReduxSagaFirebase;