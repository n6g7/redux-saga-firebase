import ReduxSagaFirebase from './index'

describe('ReduxSagaFirebase', () => {
  afterEach(() => {
    expect.hasAssertions()
  })

  describe('constructor(firebaseApp)', () => {
    const app = 'kqdlqkd'
    let rsf

    beforeEach(() => {
      rsf = new ReduxSagaFirebase(app)
    })

    it('takes a firebase app as argument', () => {
      expect(rsf.app).toBe(app)
    })

    it('takes an optional firestore db as argument', () => {
      const db = 'ksqld'
      rsf = new ReduxSagaFirebase(app, db)
      expect(rsf.firestoreDb).toBe(db)
    })

    it('defines authentication methods', () => {
      expect(rsf.auth.applyActionCode).toBeInstanceOf(Function)
      expect(rsf.auth.channel).toBeInstanceOf(Function)
      expect(rsf.auth.confirmPasswordReset).toBeInstanceOf(Function)
      expect(rsf.auth.createUserWithEmailAndPassword).toBeInstanceOf(Function)
      expect(rsf.auth.sendEmailVerification).toBeInstanceOf(Function)
      expect(rsf.auth.sendPasswordResetEmail).toBeInstanceOf(Function)
      expect(rsf.auth.signInAndRetrieveDataWithCredential).toBeInstanceOf(Function)
      expect(rsf.auth.signInAnonymously).toBeInstanceOf(Function)
      expect(rsf.auth.signInWithCredential).toBeInstanceOf(Function)
      expect(rsf.auth.signInWithCustomToken).toBeInstanceOf(Function)
      expect(rsf.auth.signInWithEmailAndPassword).toBeInstanceOf(Function)
      expect(rsf.auth.signInWithPhoneNumber).toBeInstanceOf(Function)
      expect(rsf.auth.signInWithPopup).toBeInstanceOf(Function)
      expect(rsf.auth.signInWithRedirect).toBeInstanceOf(Function)
      expect(rsf.auth.signOut).toBeInstanceOf(Function)
      expect(rsf.auth.updatePassword).toBeInstanceOf(Function)
    })

    it('defines database methods', () => {
      expect(rsf.database.read).toBeInstanceOf(Function)
      expect(rsf.database.create).toBeInstanceOf(Function)
      expect(rsf.database.update).toBeInstanceOf(Function)
      expect(rsf.database.patch).toBeInstanceOf(Function)
      expect(rsf.database.delete).toBeInstanceOf(Function)
      expect(rsf.database.channel).toBeInstanceOf(Function)
      expect(rsf.database.sync).toBeInstanceOf(Function)
    })

    it('defines firestore methods', () => {
      expect(rsf.firestore.addDocument).toBeInstanceOf(Function)
      expect(rsf.firestore.channel).toBeInstanceOf(Function)
      expect(rsf.firestore.deleteDocument).toBeInstanceOf(Function)
      expect(rsf.firestore.getCollection).toBeInstanceOf(Function)
      expect(rsf.firestore.getDocument).toBeInstanceOf(Function)
      expect(rsf.firestore.setDocument).toBeInstanceOf(Function)
      expect(rsf.firestore.syncCollection).toBeInstanceOf(Function)
      expect(rsf.firestore.syncDocument).toBeInstanceOf(Function)
      expect(rsf.firestore.updateDocument).toBeInstanceOf(Function)
    })

    it('defines functions methods', () => {
      expect(rsf.functions.call).toBeInstanceOf(Function)
    })

    it('defines messaging methods', () => {
      expect(rsf.messaging.channel).toBeInstanceOf(Function)
      expect(rsf.messaging.syncMessages).toBeInstanceOf(Function)
      expect(rsf.messaging.syncToken).toBeInstanceOf(Function)
      expect(rsf.messaging.tokenRefreshChannel).toBeInstanceOf(Function)
    })

    it('defines storage methods', () => {
      expect(rsf.storage.uploadFile).toBeInstanceOf(Function)
      expect(rsf.storage.uploadString).toBeInstanceOf(Function)
      expect(rsf.storage.getDownloadURL).toBeInstanceOf(Function)
      expect(rsf.storage.getFileMetadata).toBeInstanceOf(Function)
      expect(rsf.storage.updateFileMetadata).toBeInstanceOf(Function)
      expect(rsf.storage.deleteFile).toBeInstanceOf(Function)
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
      const projectId = 'jskdqdlqd-a1b2c'
      const app = {
        options: {
          authDomain: `${projectId}.firebaseapp.com`
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

  describe('_getRef(pathOrRef, service)', () => {
    let databaseRef, storageRef, database, storage, app, rsf

    beforeEach(() => {
      databaseRef = {
        key: 'key'
      }
      storageRef = {
        bucket: 'bucket'
      }
      database = {
        ref: jest.fn(() => databaseRef)
      }
      storage = {
        ref: jest.fn(() => storageRef)
      }
      app = {
        database: jest.fn(() => database),
        storage: jest.fn(() => storage)
      }
      rsf = new ReduxSagaFirebase(app)
    })

    it('returns a database ref from path string', () => {
      const path = 'path'
      const ref = rsf._getRef(path, 'database')

      expect(app.database.mock.calls.length).toBe(1)
      expect(app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(databaseRef)
    })

    it('returns the database ref that was passed to it', () => {
      const ref = rsf._getRef(databaseRef)

      expect(app.database.mock.calls.length).toBe(0)
      expect(database.ref.mock.calls.length).toBe(0)

      expect(ref).toEqual(databaseRef)
    })

    it('returns a storage ref from path string', () => {
      const path = 'path'
      const ref = rsf._getRef(path, 'storage')

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(storageRef)
    })

    it('returns the storage ref that was passed to it', () => {
      const ref = rsf._getRef(storageRef)

      expect(app.storage.mock.calls.length).toBe(0)
      expect(storage.ref.mock.calls.length).toBe(0)

      expect(ref).toEqual(storageRef)
    })
  })

  describe('_getCollection(pathOrRef)', () => {
    let collectionRef, firestore, app, rsf

    beforeEach(() => {
      collectionRef = {
        key: 'key'
      }
      firestore = {
        collection: jest.fn(() => collectionRef)
      }
      app = {}
      rsf = new ReduxSagaFirebase(app, firestore)
    })

    it('returns a collection ref from path string', () => {
      const path = 'path'
      const ref = rsf._getCollection(path)

      expect(firestore.collection.mock.calls.length).toBe(1)
      expect(firestore.collection.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(collectionRef)
    })

    it('returns the collection ref that was passed to it', () => {
      const ref = rsf._getCollection(collectionRef)

      expect(firestore.collection.mock.calls.length).toBe(0)

      expect(ref).toEqual(collectionRef)
    })
  })

  describe('_getDocument(pathOrRef)', () => {
    let documentRef, firestore, app, rsf

    beforeEach(() => {
      documentRef = {
        key: 'key'
      }
      firestore = {
        doc: jest.fn(() => documentRef)
      }
      app = {}
      rsf = new ReduxSagaFirebase(app, firestore)
    })

    it('returns a collection ref from path string', () => {
      const path = 'path'
      const ref = rsf._getDocument(path)

      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(documentRef)
    })

    it('returns the collection ref that was passed to it', () => {
      const ref = rsf._getDocument(documentRef)

      expect(firestore.doc.mock.calls.length).toBe(0)

      expect(ref).toEqual(documentRef)
    })
  })
})
