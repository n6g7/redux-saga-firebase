'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInAndRetrieveDataWithCredential, signInAnonymously, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, signInWithRedirect, signOut, updatePassword].map(_regenerator2.default.mark);

function applyActionCode(code) {
  var auth;
  return _regenerator2.default.wrap(function applyActionCode$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          auth = this.app.auth();
          _context.next = 3;
          return (0, _effects.call)([auth, auth.applyActionCode], code);

        case 3:
          return _context.abrupt('return', _context.sent);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function channel() {
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

function confirmPasswordReset(code, newPassword) {
  var auth;
  return _regenerator2.default.wrap(function confirmPasswordReset$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          auth = this.app.auth();
          _context2.next = 3;
          return (0, _effects.call)([auth, auth.confirmPasswordReset], code, newPassword);

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function createUserWithEmailAndPassword(email, password) {
  var auth;
  return _regenerator2.default.wrap(function createUserWithEmailAndPassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          auth = this.app.auth();
          _context3.next = 3;
          return (0, _effects.call)([auth, auth.createUserWithEmailAndPassword], email, password);

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function sendEmailVerification(actionCodeSettings) {
  var auth;
  return _regenerator2.default.wrap(function sendEmailVerification$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          auth = this.app.auth();
          _context4.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.sendEmailVerification], actionCodeSettings);

        case 3:
          return _context4.abrupt('return', _context4.sent);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function sendPasswordResetEmail(email, actionCodeSettings) {
  var auth;
  return _regenerator2.default.wrap(function sendPasswordResetEmail$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          auth = this.app.auth();
          _context5.next = 3;
          return (0, _effects.call)([auth, auth.sendPasswordResetEmail], email, actionCodeSettings);

        case 3:
          return _context5.abrupt('return', _context5.sent);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function signInAndRetrieveDataWithCredential(credential) {
  var auth;
  return _regenerator2.default.wrap(function signInAndRetrieveDataWithCredential$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          auth = this.app.auth();
          _context6.next = 3;
          return (0, _effects.call)([auth, auth.signInAndRetrieveDataWithCredential], credential);

        case 3:
          return _context6.abrupt('return', _context6.sent);

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

function signInAnonymously() {
  var auth;
  return _regenerator2.default.wrap(function signInAnonymously$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          auth = this.app.auth();
          _context7.next = 3;
          return (0, _effects.call)([auth, auth.signInAnonymously]);

        case 3:
          return _context7.abrupt('return', _context7.sent);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[6], this);
}

function signInWithCredential(credential) {
  var auth;
  return _regenerator2.default.wrap(function signInWithCredential$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          auth = this.app.auth();
          _context8.next = 3;
          return (0, _effects.call)([auth, auth.signInWithCredential], credential);

        case 3:
          return _context8.abrupt('return', _context8.sent);

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked[7], this);
}

function signInWithCustomToken(token) {
  var auth;
  return _regenerator2.default.wrap(function signInWithCustomToken$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          auth = this.app.auth();
          _context9.next = 3;
          return (0, _effects.call)([auth, auth.signInWithCustomToken], token);

        case 3:
          return _context9.abrupt('return', _context9.sent);

        case 4:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked[8], this);
}

function signInWithEmailAndPassword(email, password) {
  var auth;
  return _regenerator2.default.wrap(function signInWithEmailAndPassword$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          auth = this.app.auth();
          _context10.next = 3;
          return (0, _effects.call)([auth, auth.signInWithEmailAndPassword], email, password);

        case 3:
          return _context10.abrupt('return', _context10.sent);

        case 4:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked[9], this);
}

function signInWithPhoneNumber(phoneNumber, applicationVerifier) {
  var auth;
  return _regenerator2.default.wrap(function signInWithPhoneNumber$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          auth = this.app.auth();
          _context11.next = 3;
          return (0, _effects.call)([auth, auth.signInWithPhoneNumber], phoneNumber, applicationVerifier);

        case 3:
          return _context11.abrupt('return', _context11.sent);

        case 4:
        case 'end':
          return _context11.stop();
      }
    }
  }, _marked[10], this);
}

function signInWithPopup(authProvider) {
  var auth, _ref, credential;

  return _regenerator2.default.wrap(function signInWithPopup$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          auth = this.app.auth();
          _context12.next = 3;
          return (0, _effects.call)([auth, auth.signInWithPopup], authProvider);

        case 3:
          _ref = _context12.sent;
          credential = _ref.credential;
          return _context12.abrupt('return', credential);

        case 6:
        case 'end':
          return _context12.stop();
      }
    }
  }, _marked[11], this);
}

function signInWithRedirect(authProvider) {
  var auth;
  return _regenerator2.default.wrap(function signInWithRedirect$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          auth = this.app.auth();
          _context13.next = 3;
          return (0, _effects.call)([auth, auth.signInWithRedirect], authProvider);

        case 3:
        case 'end':
          return _context13.stop();
      }
    }
  }, _marked[12], this);
}

function signOut() {
  var auth;
  return _regenerator2.default.wrap(function signOut$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          auth = this.app.auth();
          _context14.next = 3;
          return (0, _effects.call)([auth, auth.signOut]);

        case 3:
        case 'end':
          return _context14.stop();
      }
    }
  }, _marked[13], this);
}

function updatePassword(password) {
  var auth;
  return _regenerator2.default.wrap(function updatePassword$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          auth = this.app.auth();
          _context15.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.updatePassword], password);

        case 3:
          return _context15.abrupt('return', _context15.sent);

        case 4:
        case 'end':
          return _context15.stop();
      }
    }
  }, _marked[14], this);
}

exports.default = {
  applyActionCode: applyActionCode,
  channel: channel,
  confirmPasswordReset: confirmPasswordReset,
  createUserWithEmailAndPassword: createUserWithEmailAndPassword,
  sendEmailVerification: sendEmailVerification,
  sendPasswordResetEmail: sendPasswordResetEmail,
  signInAndRetrieveDataWithCredential: signInAndRetrieveDataWithCredential,
  signInAnonymously: signInAnonymously,
  signInWithCredential: signInWithCredential,
  signInWithCustomToken: signInWithCustomToken,
  signInWithEmailAndPassword: signInWithEmailAndPassword,
  signInWithPhoneNumber: signInWithPhoneNumber,
  signInWithPopup: signInWithPopup,
  signInWithRedirect: signInWithRedirect,
  signOut: signOut,
  updatePassword: updatePassword
};