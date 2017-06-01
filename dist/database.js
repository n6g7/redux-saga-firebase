'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [get, create, update, patch, _delete].map(_regenerator2.default.mark);

function get(path) {
  var ref, result;
  return _regenerator2.default.wrap(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ref = this.app.database().ref(path);
          _context.next = 3;
          return (0, _effects.call)([ref, ref.once], 'value');

        case 3:
          result = _context.sent;
          return _context.abrupt('return', result.val());

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function create(path, data) {
  var ref, result;
  return _regenerator2.default.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ref = this.app.database().ref(path);
          _context2.next = 3;
          return (0, _effects.call)([ref, ref.push], data);

        case 3:
          result = _context2.sent;
          return _context2.abrupt('return', result.key);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function update(path, data) {
  var ref;
  return _regenerator2.default.wrap(function update$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ref = this.app.database().ref(path);
          _context3.next = 3;
          return (0, _effects.call)([ref, ref.set], data);

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function patch(path, data) {
  var ref;
  return _regenerator2.default.wrap(function patch$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ref = this.app.database().ref(path);
          _context4.next = 3;
          return (0, _effects.call)([ref, ref.update], data);

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function _delete(path) {
  var ref;
  return _regenerator2.default.wrap(function _delete$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ref = this.app.database().ref(path);
          _context5.next = 3;
          return (0, _effects.call)([ref, ref.remove]);

        case 3:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function channel(path) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

  var ref = this.app.database().ref(path);

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var callback = ref.on(event, function (dataSnapshot) {
      return emit(dataSnapshot.val());
    });

    // Returns unsubscribe function
    return function () {
      return ref.off(event, callback);
    };
  });

  return channel;
}

exports.default = {
  get: get,
  create: create,
  update: update,
  patch: patch,
  delete: _delete,
  channel: channel
};