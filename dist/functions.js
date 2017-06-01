'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getFunctionURL = getFunctionURL;

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_call].map(_regenerator2.default.mark);

function getFunctionURL(functionName) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var baseUrl = 'https://' + this.region + '-' + this.projectId() + '.cloudfunctions.net/' + functionName;
  var query = (0, _keys2.default)(parameters).map(function (key) {
    return key + '=' + parameters[key];
  }).join('&');

  if (query) return baseUrl + '?' + query;else return baseUrl;
}

function _call(functionName) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var url, response, contentType, parser, data;
  return _regenerator2.default.wrap(function _call$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = getFunctionURL.call(this, functionName, parameters);
          _context.next = 3;
          return (0, _effects.call)(fetch, url);

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw response;

        case 6:
          contentType = response.headers.get('Content-Type');
          parser = contentType.startsWith('application/json') ? response.json : response.text;
          _context.next = 10;
          return (0, _effects.call)([response, parser]);

        case 10:
          data = _context.sent;
          return _context.abrupt('return', data);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

exports.default = {
  call: _call
};