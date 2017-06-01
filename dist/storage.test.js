'use strict';

var _effects = require('redux-saga/effects');

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('storage', function () {
  var ref = void 0,
      storage = void 0,
      context = void 0;

  beforeEach(function () {
    ref = {
      delete: jest.fn(),
      getDownloadURL: jest.fn(),
      getMetadata: jest.fn(),
      put: jest.fn(),
      putString: jest.fn(),
      updateMetadata: jest.fn()
    };
    storage = {
      ref: jest.fn(function () {
        return ref;
      })
    };
    context = {
      app: {
        storage: jest.fn(function () {
          return storage;
        })
      }
    };
  });

  describe('upload(path, file, metadata)', function () {
    it('works', function () {
      var path = 'skddksl';
      var file = 'qdmlqssdklq';
      var metadata = 'qpsdksql';
      var task = 'jqldlksq';
      var iterator = _storage2.default.upload.call(context, path, file, metadata);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.put], file, metadata));

      expect(context.app.storage.mock.calls.length).toBe(1);
      expect(context.app.storage.mock.calls[0]).toEqual([]);

      expect(storage.ref.mock.calls.length).toBe(1);
      expect(storage.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(task)).toEqual({
        done: true,
        value: task
      });
    });
  });

  describe('uploadString(path, string, format, metadata)', function () {
    it('works', function () {
      var path = 'skddksl';
      var string = 'qdmlqssdklq';
      var format = 'qp^zpq';
      var metadata = 'qpsdksql';
      var task = 'jqldlksq';
      var iterator = _storage2.default.uploadString.call(context, path, string, format, metadata);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.putString], string, format, metadata));

      expect(context.app.storage.mock.calls.length).toBe(1);
      expect(context.app.storage.mock.calls[0]).toEqual([]);

      expect(storage.ref.mock.calls.length).toBe(1);
      expect(storage.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(task)).toEqual({
        done: true,
        value: task
      });
    });
  });

  describe('getDownloadURL(path)', function () {
    it('works', function () {
      var path = 'skddksl';
      var url = 'nkqkds';
      var iterator = _storage2.default.getDownloadURL.call(context, path);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.getDownloadURL]));

      expect(context.app.storage.mock.calls.length).toBe(1);
      expect(context.app.storage.mock.calls[0]).toEqual([]);

      expect(storage.ref.mock.calls.length).toBe(1);
      expect(storage.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(url)).toEqual({
        done: true,
        value: url
      });
    });
  });

  describe('getFileMetadata(path)', function () {
    it('works', function () {
      var path = 'skddksl';
      var metadata = 'nkqkds';
      var iterator = _storage2.default.getFileMetadata.call(context, path);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.getMetadata]));

      expect(context.app.storage.mock.calls.length).toBe(1);
      expect(context.app.storage.mock.calls[0]).toEqual([]);

      expect(storage.ref.mock.calls.length).toBe(1);
      expect(storage.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(metadata)).toEqual({
        done: true,
        value: metadata
      });
    });
  });

  describe('updateFileMetadata(path, newMetadata)', function () {
    it('works', function () {
      var path = 'skddksl';
      var newMetadata = 'nkqkds';
      var metadata = 'qsdmqdmql';
      var iterator = _storage2.default.updateFileMetadata.call(context, path, newMetadata);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.updateMetadata], newMetadata));

      expect(context.app.storage.mock.calls.length).toBe(1);
      expect(context.app.storage.mock.calls[0]).toEqual([]);

      expect(storage.ref.mock.calls.length).toBe(1);
      expect(storage.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next(metadata)).toEqual({
        done: true,
        value: metadata
      });
    });
  });

  describe('deleteFile(path)', function () {
    it('works', function () {
      var path = 'skddksl';
      var iterator = _storage2.default.deleteFile.call(context, path);

      expect(iterator.next().value).toEqual((0, _effects.call)([ref, ref.delete]));

      expect(context.app.storage.mock.calls.length).toBe(1);
      expect(context.app.storage.mock.calls[0]).toEqual([]);

      expect(storage.ref.mock.calls.length).toBe(1);
      expect(storage.ref.mock.calls[0]).toEqual([path]);

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });
});