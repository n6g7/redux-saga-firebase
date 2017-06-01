'use strict';

var _effects = require('redux-saga/effects');

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('database', function () {
  var ref = void 0,
      database = void 0,
      context = void 0;

  beforeEach(function () {
    ref = {
      on: jest.fn(),
      once: jest.fn(),
      push: jest.fn(),
      remove: jest.fn(),
      set: jest.fn(),
      update: jest.fn()
    };
    database = {
      ref: jest.fn(function () {
        return ref;
      })
    };
    context = {
      app: {
        database: jest.fn(function () {
          return database;
        })
      }
    };
  });

  describe('get(path)', function () {
    it('works', function () {
      var path = 'skddksl';
      var val = 'jqdqkld';
      var result = {
        val: jest.fn(function () {
          return val;
        })
      };
      var iterator = _database2.default.get.call(context, path);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.once], 'value'));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: val
      });

      expect(result.val.mock.calls.length).toBe(1);
      expect(result.val.mock.calls[0]).toEqual([]);
    });
  });

  describe('create(path, data)', function () {
    it('works', function () {
      var path = 'skddksl';
      var data = 'okqdkj';
      var result = {
        key: 'qsdklq'
      };
      var iterator = _database2.default.create.call(context, path, data);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.push], data));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result.key
      });
    });
  });

  describe('update(path, data)', function () {
    it('works', function () {
      var path = 'skddksl';
      var data = 'okqdkj';
      var iterator = _database2.default.update.call(context, path, data);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.set], data));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });

  describe('patch(path, data)', function () {
    it('works', function () {
      var path = 'skddksl';
      var data = 'okqdkj';
      var iterator = _database2.default.patch.call(context, path, data);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.update], data));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });

  describe('delete(path)', function () {
    it('works', function () {
      var path = 'skddksl';
      var iterator = _database2.default.delete.call(context, path);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.remove]));

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });

  describe('channel(path, event)', function () {
    it('works', function () {
      var path = 'skddksl';
      var event = 'okqdkj';
      _database2.default.channel.call(context, path, event);

      expect(context.app.database.mock.calls.length).toBe(1);
      expect(context.app.database.mock.calls[0]).toEqual([]);

      expect(database.ref.mock.calls.length).toBe(1);
      expect(database.ref.mock.calls[0]).toEqual([path]);

      expect(ref.on.mock.calls.length).toBe(1);
      expect(ref.on.mock.calls[0][0]).toBe(event);
    });
  });
});