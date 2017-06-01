'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _effects = require('redux-saga/effects');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('auth', function () {
  var unsubscribe = jest.fn();

  var auth = {
    onAuthStateChanged: jest.fn(function () {
      return unsubscribe;
    }),
    signInAnonymously: jest.fn(),
    signInWithPopup: jest.fn(),
    signOut: jest.fn()
  };

  var context = {
    app: {
      auth: jest.fn(function () {
        return auth;
      })
    }
  };

  describe('signInAnonymously()', function () {
    it('returns a user', function () {
      var user = 'qosdqkds';
      var iterator = _auth2.default.signInAnonymously.call(context);

      expect(iterator.next().value).toEqual((0, _effects.call)([auth, auth.signInAnonymously]));

      expect(iterator.next(user)).toEqual({
        done: true,
        value: user
      });
    });
  });

  describe('signInWithPopup(authProvider)', function () {
    it('returns credentials', function () {
      var authProvider = 'skqdk';
      var credential = 'qosdqkds';
      var iterator = _auth2.default.signInWithPopup.call(context, authProvider);

      expect(iterator.next().value).toEqual((0, _effects.call)([auth, auth.signInWithPopup], authProvider));

      expect(iterator.next({ credential: credential })).toEqual({
        done: true,
        value: credential
      });
    });
  });

  describe('logout()', function () {
    it('works', function () {
      var iterator = _auth2.default.logout.call(context);

      expect(iterator.next().value).toEqual((0, _effects.call)([auth, auth.signOut]));

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });

  describe('authChannel()', function () {
    it('works', function () {
      var result = _auth2.default.authChannel.call(context);

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1);
      expect(context._authChannel).toBe(result);
    });

    it('returns the cached authChannel if there is one', function () {
      var cachedAuthChannel = 'smldklqd';
      var result = _auth2.default.authChannel.call(_extends({}, context, {
        _authChannel: cachedAuthChannel
      }));

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1);
      expect(result).toBe(cachedAuthChannel);
    });

    it('returns a close-able channel', function () {
      var channel = _auth2.default.authChannel.call(context);

      channel.close();
      expect(unsubscribe.mock.calls.length).toBe(1);
    });
  });
});