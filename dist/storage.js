'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getDownloadURL, getFileMetadata, updateFileMetadata, deleteFile].map(_regenerator2.default.mark);

function uploadFile(pathOrRef, file, metadata) {
  var ref = this._getRef(pathOrRef, 'storage');
  var task = ref.put(file, metadata);

  return task;
}

function uploadString(pathOrRef, string, format, metadata) {
  var ref = this._getRef(pathOrRef, 'storage');
  var task = ref.putString(string, format, metadata);

  return task;
}

function getDownloadURL(pathOrRef) {
  var ref, url;
  return _regenerator2.default.wrap(function getDownloadURL$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'storage');
          _context.next = 3;
          return (0, _effects.call)([ref, ref.getDownloadURL]);

        case 3:
          url = _context.sent;
          return _context.abrupt('return', url);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function getFileMetadata(pathOrRef) {
  var ref, metadata;
  return _regenerator2.default.wrap(function getFileMetadata$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'storage');
          _context2.next = 3;
          return (0, _effects.call)([ref, ref.getMetadata]);

        case 3:
          metadata = _context2.sent;
          return _context2.abrupt('return', metadata);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function updateFileMetadata(pathOrRef, newMetadata) {
  var ref, metadata;
  return _regenerator2.default.wrap(function updateFileMetadata$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'storage');
          _context3.next = 3;
          return (0, _effects.call)([ref, ref.updateMetadata], newMetadata);

        case 3:
          metadata = _context3.sent;
          return _context3.abrupt('return', metadata);

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function deleteFile(pathOrRef) {
  var ref;
  return _regenerator2.default.wrap(function deleteFile$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'storage');
          _context4.next = 3;
          return (0, _effects.call)([ref, ref.delete]);

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

exports.default = {
  uploadFile: uploadFile,
  uploadString: uploadString,
  getDownloadURL: getDownloadURL,
  getFileMetadata: getFileMetadata,
  updateFileMetadata: updateFileMetadata,
  deleteFile: deleteFile
};