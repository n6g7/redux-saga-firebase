'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [read, create, update, patch, _delete, sync].map(_regenerator2.default.mark);

var noop = function noop(x) {
  return x;
};

function read(pathOrRef) {
  var ref, result;
  return _regenerator2.default.wrap(function read$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
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

function create(pathOrRef, data) {
  var ref, result;
  return _regenerator2.default.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
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

function update(pathOrRef, data) {
  var ref;
  return _regenerator2.default.wrap(function update$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context3.next = 3;
          return (0, _effects.call)([ref, ref.set], data);

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function patch(pathOrRef, data) {
  var ref;
  return _regenerator2.default.wrap(function patch$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context4.next = 3;
          return (0, _effects.call)([ref, ref.update], data);

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function _delete(pathOrRef) {
  var ref;
  return _regenerator2.default.wrap(function _delete$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context5.next = 3;
          return (0, _effects.call)([ref, ref.remove]);

        case 3:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function channel(pathOrRef) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

  var ref = this._getRef(pathOrRef, 'database');

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var callback = ref.on(event, function (dataSnapshot) {
      return emit({
        snapshot: dataSnapshot,
        value: dataSnapshot.val()
      });
    }

    // Returns unsubscribe function
    );return function () {
      return ref.off(event, callback);
    };
  });

  return channel;
}

function sync(pathOrRef, actionCreator) {
  var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  var channel, _ref, value;

  return _regenerator2.default.wrap(function sync$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.call)(this.database.channel, pathOrRef);

        case 2:
          channel = _context6.sent;
          _context6.prev = 3;

        case 4:
          if (!true) {
            _context6.next = 13;
            break;
          }

          _context6.next = 7;
          return (0, _effects.take)(channel);

        case 7:
          _ref = _context6.sent;
          value = _ref.value;
          _context6.next = 11;
          return (0, _effects.put)(actionCreator(transform(value)));

        case 11:
          _context6.next = 4;
          break;

        case 13:
          _context6.prev = 13;
          _context6.next = 16;
          return (0, _effects.cancelled)();

        case 16:
          if (!_context6.sent) {
            _context6.next = 18;
            break;
          }

          channel.close();

        case 18:
          return _context6.finish(13);

        case 19:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this, [[3,, 13, 19]]);
}

exports.default = {
  read: read,
  create: create,
  update: update,
  patch: patch,
  delete: _delete,
  channel: channel,
  sync: sync
};