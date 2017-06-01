'use strict';

var _messaging = require('./messaging');

var _messaging2 = _interopRequireDefault(_messaging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('messaging', function () {
  var context = void 0;
  var messaging = void 0;
  var unsubscribe = void 0;

  beforeEach(function () {
    unsubscribe = jest.fn();
    messaging = {
      onMessage: jest.fn(function () {
        return unsubscribe;
      }),
      onTokenRefresh: jest.fn(function () {
        return unsubscribe;
      })
    };
    context = {
      app: {
        messaging: jest.fn(function () {
          return messaging;
        })
      }
    };
  });

  describe('messageChannel()', function () {
    it('works', function () {
      var result = _messaging2.default.messageChannel.call(context);

      expect(context.app.messaging.mock.calls.length).toBe(1);
      expect(context.app.messaging.mock.calls[0]).toEqual([]);

      expect(messaging.onMessage.mock.calls.length).toBe(1);

      expect(context._messageChannel).toBe(result);
    });

    it('returns a cached version is available', function () {
      context._messageChannel = 'jlkqjdklqs';
      var result = _messaging2.default.messageChannel.call(context);

      expect(context.app.messaging.mock.calls.length).toBe(0);
      expect(messaging.onMessage.mock.calls.length).toBe(0);

      expect(context._messageChannel).toBe(result);
    });
  });

  describe('tokenRefreshChannel()', function () {
    it('works', function () {
      var result = _messaging2.default.tokenRefreshChannel.call(context);

      expect(context.app.messaging.mock.calls.length).toBe(1);
      expect(context.app.messaging.mock.calls[0]).toEqual([]);

      expect(messaging.onTokenRefresh.mock.calls.length).toBe(1);

      expect(context._tokenRefreshChannel).toBe(result);
    });

    it('returns a cached version is available', function () {
      context._tokenRefreshChannel = 'sdqmkmslk';
      var result = _messaging2.default.tokenRefreshChannel.call(context);

      expect(context.app.messaging.mock.calls.length).toBe(0);
      expect(messaging.onTokenRefresh.mock.calls.length).toBe(0);

      expect(context._tokenRefreshChannel).toBe(result);
    });
  });
});