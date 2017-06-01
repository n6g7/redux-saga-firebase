'use strict';

var _effects = require('redux-saga/effects');

require('whatwg-fetch');

var _functions = require('./functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('functions', function () {
  var projectId = 'qdkqlsmd';
  var region = 'lqkdsmlqk';
  var context = void 0;

  beforeEach(function () {
    context = {
      projectId: jest.fn(function () {
        return projectId;
      }),
      region: region
    };
  });

  describe('call(functionName, parameters={})', function () {
    it('works with text', function () {
      var functionName = 'qsdsqldlq';
      var contentType = 'qlmdkd';
      var response = {
        headers: {
          get: jest.fn(function () {
            return contentType;
          })
        },
        ok: true,
        text: jest.fn()
      };
      var data = 'qlkdmsq';
      var iterator = _functions2.default.call.call(context, functionName);

      expect(iterator.next().value).toEqual((0, _effects.call)(fetch, 'https://' + region + '-' + projectId + '.cloudfunctions.net/' + functionName));

      expect(context.projectId.mock.calls.length).toBe(1);

      expect(iterator.next(response).value).toEqual((0, _effects.call)([response, response.text]));

      expect(response.headers.get.mock.calls.length).toBe(1);
      expect(response.headers.get.mock.calls[0]).toEqual(['Content-Type']);

      expect(iterator.next(data)).toEqual({
        done: true,
        value: data
      });
    });

    it('works with json', function () {
      var functionName = 'qsdsqldlq';
      var contentType = 'application/json';
      var response = {
        headers: {
          get: jest.fn(function () {
            return contentType;
          })
        },
        ok: true,
        json: jest.fn()
      };
      var data = 'qlkdmsq';
      var iterator = _functions2.default.call.call(context, functionName);

      expect(iterator.next().value).toEqual((0, _effects.call)(fetch, 'https://' + region + '-' + projectId + '.cloudfunctions.net/' + functionName));

      expect(context.projectId.mock.calls.length).toBe(1);

      expect(iterator.next(response).value).toEqual((0, _effects.call)([response, response.json]));

      expect(response.headers.get.mock.calls.length).toBe(1);
      expect(response.headers.get.mock.calls[0]).toEqual(['Content-Type']);

      expect(iterator.next(data)).toEqual({
        done: true,
        value: data
      });
    });

    it('throws when it fails', function () {
      var functionName = 'qsdsqldlq';
      var response = {
        ok: false
      };

      try {
        var iterator = _functions2.default.call.call(context, functionName);

        expect(iterator.next().value).toEqual((0, _effects.call)(fetch, 'https://' + region + '-' + projectId + '.cloudfunctions.net/' + functionName));

        expect(context.projectId.mock.calls.length).toBe(1);

        expect(iterator.next(response).value).toEqual(response);

        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe(response);
      }
    });
  });

  describe('getFunctionURL(functionName, parameters)', function () {
    it('generates correct URLs - without parameters', function () {
      var functionName = 'qsdsqldlq';
      var result = _functions.getFunctionURL.call(context, functionName);

      expect(result).toBe('https://' + region + '-' + projectId + '.cloudfunctions.net/' + functionName);
    });

    it('generates correct URLs - with parameters', function () {
      var functionName = 'qsdsqldlq';
      var parameters = {
        a: 'qpdkq',
        b: 'qdlmlqdms'
      };
      var result = _functions.getFunctionURL.call(context, functionName, parameters);

      expect(result).toBe('https://' + region + '-' + projectId + '.cloudfunctions.net/' + functionName + '?a=' + parameters.a + '&b=' + parameters.b);
    });
  });
});