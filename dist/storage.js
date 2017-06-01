'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _effects = require('redux-saga/effects');

var _marked = [upload, uploadString, getDownloadURL, getFileMetadata, updateFileMetadata, deleteFile].map(regeneratorRuntime.mark);

function upload(path, file, metadata) {
  var ref, task;
  return regeneratorRuntime.wrap(function upload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ref = this.app.storage().ref(path);
          _context.next = 3;
          return (0, _effects.call)([ref, ref.put], file, metadata);

        case 3:
          task = _context.sent;
          return _context.abrupt('return', task);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function uploadString(path, string, format, metadata) {
  var ref, task;
  return regeneratorRuntime.wrap(function uploadString$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ref = this.app.storage().ref(path);
          _context2.next = 3;
          return (0, _effects.call)([ref, ref.putString], string, format, metadata);

        case 3:
          task = _context2.sent;
          return _context2.abrupt('return', task);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function getDownloadURL(path) {
  var ref, url;
  return regeneratorRuntime.wrap(function getDownloadURL$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ref = this.app.storage().ref(path);
          _context3.next = 3;
          return (0, _effects.call)([ref, ref.getDownloadURL]);

        case 3:
          url = _context3.sent;
          return _context3.abrupt('return', url);

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function getFileMetadata(path) {
  var ref, metadata;
  return regeneratorRuntime.wrap(function getFileMetadata$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ref = this.app.storage().ref(path);
          _context4.next = 3;
          return (0, _effects.call)([ref, ref.getMetadata]);

        case 3:
          metadata = _context4.sent;
          return _context4.abrupt('return', metadata);

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function updateFileMetadata(path, newMetadata) {
  var ref, metadata;
  return regeneratorRuntime.wrap(function updateFileMetadata$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ref = this.app.storage().ref(path);
          _context5.next = 3;
          return (0, _effects.call)([ref, ref.updateMetadata], newMetadata);

        case 3:
          metadata = _context5.sent;
          return _context5.abrupt('return', metadata);

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function deleteFile(path) {
  var ref;
  return regeneratorRuntime.wrap(function deleteFile$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          ref = this.app.storage().ref(path);
          _context6.next = 3;
          return (0, _effects.call)([ref, ref.delete]);

        case 3:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

exports.default = {
  upload: upload,
  uploadString: uploadString,
  getDownloadURL: getDownloadURL,
  getFileMetadata: getFileMetadata,
  updateFileMetadata: updateFileMetadata,
  deleteFile: deleteFile
};