'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [signInAnonymously, signInWithPopup, logout].map(_regenerator2.default.mark);

function signInAnonymously() {
  var auth;
  return _regenerator2.default.wrap(function signInAnonymously$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          auth = this.app.auth();
          _context.next = 3;
          return (0, _effects.call)([auth, auth.signInAnonymously]);

        case 3:
          return _context.abrupt('return', _context.sent);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function signInWithPopup(authProvider) {
  var auth, _ref, credential;

  return _regenerator2.default.wrap(function signInWithPopup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          auth = this.app.auth();
          _context2.next = 3;
          return (0, _effects.call)([auth, auth.signInWithPopup], authProvider);

        case 3:
          _ref = _context2.sent;
          credential = _ref.credential;
          return _context2.abrupt('return', credential);

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function logout() {
  var auth;
  return _regenerator2.default.wrap(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          auth = this.app.auth();
          _context3.next = 3;
          return (0, _effects.call)([auth, auth.signOut]);

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function authChannel() {
  if (this._authChannel) return this._authChannel;

  var auth = this.app.auth();
  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = auth.onAuthStateChanged(function (user) {
      return emit({ user: user });
    }, function (error) {
      return emit({ error: error });
    });

    return unsubscribe;
  });

  this._authChannel = channel;
  return channel;
}

exports.default = {
  authChannel: authChannel,
  signInAnonymously: signInAnonymously,
  signInWithPopup: signInWithPopup,
  logout: logout
};