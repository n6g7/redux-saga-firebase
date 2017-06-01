'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ReduxSagaFirebase', function () {
  describe('constructor(firebaseApp)', function () {
    var app = 'kqdlqkd';
    var rsf = void 0;

    beforeEach(function () {
      rsf = new _index2.default(app);
    });

    it('takes a firebase app as argument', function () {
      expect(rsf.app).toBe(app);
    });

    it('defines authentication methods', function () {
      expect(rsf.signInAnonymously).toBeInstanceOf(Function);
      expect(rsf.signInWithPopup).toBeInstanceOf(Function);
      expect(rsf.logout).toBeInstanceOf(Function);
      expect(rsf.authChannel).toBeInstanceOf(Function);
    });

    it('defines database methods', function () {
      expect(rsf.get).toBeInstanceOf(Function);
      expect(rsf.create).toBeInstanceOf(Function);
      expect(rsf.update).toBeInstanceOf(Function);
      expect(rsf.patch).toBeInstanceOf(Function);
      expect(rsf.delete).toBeInstanceOf(Function);
      expect(rsf.channel).toBeInstanceOf(Function);
    });

    it('defines functions methods', function () {
      expect(rsf.call).toBeInstanceOf(Function);
    });

    it('defines messaging methods', function () {
      expect(rsf.messageChannel).toBeInstanceOf(Function);
      expect(rsf.tokenRefreshChannel).toBeInstanceOf(Function);
    });

    it('defines storage methods', function () {
      expect(rsf.upload).toBeInstanceOf(Function);
      expect(rsf.uploadString).toBeInstanceOf(Function);
      expect(rsf.getDownloadURL).toBeInstanceOf(Function);
      expect(rsf.getFileMetadata).toBeInstanceOf(Function);
      expect(rsf.updateFileMetadata).toBeInstanceOf(Function);
      expect(rsf.deleteFile).toBeInstanceOf(Function);
    });
  });

  describe('projectId()', function () {
    it('infers a project id from the firebase app (simple)', function () {
      var projectId = 'jskdqdlqd';
      var app = {
        options: {
          authDomain: projectId + '.firebaseapp.com'
        }
      };
      var rsf = new _index2.default(app);

      expect(rsf.projectId()).toBe(projectId);
      expect(rsf._projectId).toBe(projectId);
    });

    it('infers a project id from the firebase app (complex)', function () {
      var projectId = 'jskdqdlqd';
      var app = {
        options: {
          authDomain: projectId + '-a1b2c.firebaseapp.com'
        }
      };
      var rsf = new _index2.default(app);

      expect(rsf.projectId()).toBe(projectId);
      expect(rsf._projectId).toBe(projectId);
    });

    it('returns the cached project ID if it exists', function () {
      var projectId = 'isdjqijd';
      var app = {};
      var rsf = new _index2.default(app);
      rsf._projectId = projectId;

      expect(rsf.projectId()).toBe(projectId);
    });
  });
});