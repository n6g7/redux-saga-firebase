import ReduxSagaFirebase from './index'

describe('ReduxSagaFirebase', () => {
  describe('constructor(firebaseApp)', () => {
    const app = 'kqdlqkd'
    let rsf

    beforeEach(() => {
      rsf = new ReduxSagaFirebase(app)
    })

    it('takes a firebase app as argument', () => {
      expect(rsf.app).toBe(app)
    })

    it('defines authentication methods', () => {
      expect(rsf.signInWithPopup).toBeInstanceOf(Function)
      expect(rsf.logout).toBeInstanceOf(Function)
      expect(rsf.authChannel).toBeInstanceOf(Function)
    })

    it('defines database methods', () => {
      expect(rsf.get).toBeInstanceOf(Function)
      expect(rsf.create).toBeInstanceOf(Function)
      expect(rsf.update).toBeInstanceOf(Function)
      expect(rsf.patch).toBeInstanceOf(Function)
      expect(rsf.delete).toBeInstanceOf(Function)
      expect(rsf.channel).toBeInstanceOf(Function)
    })

    it('defines functions methods', () => {
      expect(rsf.call).toBeInstanceOf(Function)
    })

    it('defines messaging methods', () => {
      expect(rsf.messageChannel).toBeInstanceOf(Function)
      expect(rsf.tokenRefreshChannel).toBeInstanceOf(Function)
    })

    it('defines storage methods', () => {
      expect(rsf.upload).toBeInstanceOf(Function)
      expect(rsf.uploadString).toBeInstanceOf(Function)
      expect(rsf.getDownloadURL).toBeInstanceOf(Function)
      expect(rsf.getFileMetadata).toBeInstanceOf(Function)
      expect(rsf.updateFileMetadata).toBeInstanceOf(Function)
      expect(rsf.deleteFile).toBeInstanceOf(Function)
    })
  })

  describe('projectId()', () => {
    it('infers a project id from the firebase app (simple)', () => {
      const projectId = 'jskdqdlqd'
      const app = {
        options: {
          authDomain: `${projectId}.firebaseapp.com`
        }
      }
      const rsf = new ReduxSagaFirebase(app)

      expect(rsf.projectId()).toBe(projectId)
      expect(rsf._projectId).toBe(projectId)
    })

    it('infers a project id from the firebase app (complex)', () => {
      const projectId = 'jskdqdlqd'
      const app = {
        options: {
          authDomain: `${projectId}-a1b2c.firebaseapp.com`
        }
      }
      const rsf = new ReduxSagaFirebase(app)

      expect(rsf.projectId()).toBe(projectId)
      expect(rsf._projectId).toBe(projectId)
    })

    it('returns the cached project ID if it exists', () => {
      const projectId = 'isdjqijd'
      const app = {}
      const rsf = new ReduxSagaFirebase(app)
      rsf._projectId = projectId

      expect(rsf.projectId()).toBe(projectId)
    })
  })
})
