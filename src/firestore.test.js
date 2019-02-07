import { call, fork } from 'redux-saga/effects'

import firestoreModule, { getCollectionRef, getDocumentRef } from './firestore'
import { syncChannel } from './utils'

describe('firestore', () => {
  let app, collection, context, document, firestore, query, unsubscribe

  beforeEach(() => {
    unsubscribe = jest.fn()
    document = {
      delete: jest.fn(),
      get: jest.fn(),
      onSnapshot: jest.fn(() => unsubscribe),
      set: jest.fn(),
      update: jest.fn(),
    }
    collection = {
      add: jest.fn(),
      doc: jest.fn(() => document),
      get: jest.fn(),
      onSnapshot: jest.fn(() => unsubscribe),
    }
    query = {
      get: jest.fn(),
      limit: jest.fn(),
      onSnapshot: jest.fn(() => unsubscribe),
      orderBy: jest.fn(),
      where: jest.fn(),
    }
    firestore = {
      collection: jest.fn(() => collection),
      doc: jest.fn(() => document),
    }
    app = {
      firestore: jest.fn(() => firestore),
    }
    context = {
      app,
      firestore: {
        channel: jest.fn(),
      },
    }
  })

  afterEach(() => {
    expect.hasAssertions()
  })

  describe('addDocument(collectionRef, data)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const data = 'qplsmdkqlm'
      const result = 'kd'

      const iterator = firestoreModule.addDocument.call(context, collectionRef, data)

      expect(iterator.next().value).toEqual(call([collection, collection.add], data))

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.collection.mock.calls.length).toBe(1)
      expect(firestore.collection.mock.calls[0]).toEqual([collectionRef])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result,
      })
    })
  })

  describe('channel(path, type)', () => {
    it('works for collections', () => {
      const path = 'skddksl'
      const type = 'collection'
      firestoreModule.channel.call(context, path, type)

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.collection.mock.calls.length).toBe(1)
      expect(firestore.collection.mock.calls[0]).toEqual([path])

      expect(collection.onSnapshot.mock.calls.length).toBe(1)
    })

    it('works for documents', () => {
      const path = 'skddksl'
      const type = 'document'
      firestoreModule.channel.call(context, path, type)

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([path])

      expect(document.onSnapshot.mock.calls.length).toBe(1)
    })

    it('uses "collection" for default type', () => {
      const path = 'path'
      firestoreModule.channel.call(context, path)

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(firestore.collection.mock.calls.length).toBe(1)
    })

    it('unsubscribes when the channel is closed', () => {
      const path = 'path'
      const type = 'type'
      const channel = firestoreModule.channel.call(context, path, type)
      channel.close()

      expect(unsubscribe.mock.calls.length).toBe(1)
    })

    it('accepts a firebase.firestore.CollectionReference', () => {
      const type = 'collection'
      firestoreModule.channel.call(context, collection, type)

      expect(app.firestore.mock.calls.length).toBe(0)
      expect(firestore.collection.mock.calls.length).toBe(0)

      expect(collection.onSnapshot.mock.calls.length).toBe(1)
    })

    it('accepts a firebase.firestore.DocumentReference', () => {
      const type = 'doc'
      firestoreModule.channel.call(context, document, type)

      expect(app.firestore.mock.calls.length).toBe(0)
      expect(firestore.doc.mock.calls.length).toBe(0)

      expect(document.onSnapshot.mock.calls.length).toBe(1)
    })

    it('respects snapshot listen options for collections', () => {
      const type = 'collection'
      const options = { includeMetadataChanges: true }
      firestoreModule.channel.call(context, 'foo', type, undefined, options)

      expect(collection.onSnapshot.mock.calls.length).toBe(1)
      expect(collection.onSnapshot.mock.calls[0][0]).toBe(options)
    })

    it('respects snapshot listen options for documents', () => {
      const type = 'document'
      const options = { includeMetadataChanges: true }
      firestoreModule.channel.call(context, 'foo', type, undefined, options)

      expect(document.onSnapshot.mock.calls.length).toBe(1)
      expect(document.onSnapshot.mock.calls[0][0]).toBe(options)
    })
  })

  describe('deleteDocument(documentRef)', () => {
    it('works', () => {
      const documentRef = 'qplsmdkqlm'

      const iterator = firestoreModule.deleteDocument.call(context, documentRef)

      expect(iterator.next().value).toEqual(call([document, document.delete]))

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('getCollection(collectionRef)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const val = 'asd'
      const result = {
        data: jest.fn(() => val),
        id: val,
      }
      const response = [result, result]

      const iterator = firestoreModule.getCollection.call(context, collectionRef)

      expect(iterator.next().value).toEqual(call([collection, collection.get]))

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.collection.mock.calls.length).toBe(1)
      expect(firestore.collection.mock.calls[0]).toEqual([collectionRef])

      expect(iterator.next(response)).toEqual({
        done: true,
        value: response,
      })
    })

    it('accepts a firebase.firestore.CollectionReference', () => {
      const val = 'asd'
      const result = {
        data: jest.fn(() => val),
        id: val,
      }
      const response = [result, result]

      const iterator = firestoreModule.getCollection.call(context, collection)

      expect(iterator.next().value).toEqual(call([collection, collection.get]))

      expect(app.firestore.mock.calls.length).toBe(0)
      expect(firestore.collection.mock.calls.length).toBe(0)

      expect(iterator.next(response)).toEqual({
        done: true,
        value: response,
      })
    })

    it('accepts a firebase.firestore.Query', () => {
      const val = 'asd'
      const result = {
        data: jest.fn(() => val),
        id: val,
      }
      const response = [result, result]

      const iterator = firestoreModule.getCollection.call(context, query)

      expect(iterator.next().value).toEqual(call([query, query.get]))

      expect(app.firestore.mock.calls.length).toBe(0)
      expect(firestore.collection.mock.calls.length).toBe(0)

      expect(iterator.next(response)).toEqual({
        done: true,
        value: response,
      })
    })
  })

  describe('getDocument(documentRef)', () => {
    it('works', () => {
      const documentRef = 'skddksld'
      const val = 'jqdqkld'
      const result = {
        data: jest.fn(() => val),
        id: 0,
      }
      const iterator = firestoreModule.getDocument.call(context, documentRef)

      expect(iterator.next().value).toEqual(call([document, document.get]))

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result,
      })
    })
  })

  describe('setDocument(documentRef, data, options)', () => {
    it('works', () => {
      const documentRef = 'skddksld'
      const data = 'qlsdl'
      const options = 'oqskdqm'

      const iterator = firestoreModule.setDocument.call(
        context,
        documentRef,
        data,
        options,
      )

      expect(iterator.next().value).toEqual(call([document, document.set], data, options))

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('syncCollection(path, options)', () => {
    it('works', () => {
      const path = 'skddksl'
      const options = {}
      const iterator = firestoreModule.syncCollection.call(context, path, options)

      expect(iterator.next().value).toEqual(
        call(context.firestore.channel, path, 'collection', undefined, undefined),
      )

      const chan = 'eeeerqd'
      expect(iterator.next(chan)).toEqual({
        done: false,
        value: fork(syncChannel, chan, options),
      })

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })

    it('accepts a firebase.firestore.CollectionReference', () => {
      const options = {}
      const iterator = firestoreModule.syncCollection.call(context, collection, options)

      expect(iterator.next().value).toEqual(
        call(context.firestore.channel, collection, 'collection', undefined, undefined),
      )

      const chan = 'eeeerqd'
      expect(iterator.next(chan)).toEqual({
        done: false,
        value: fork(syncChannel, chan, options),
      })

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })

    it('respects snapshot listen options', () => {
      const path = 'skddksl'
      const options = { snapshotListenOptions: { includeMetadataChanges: true } }
      const iterator = firestoreModule.syncCollection.call(context, path, options)

      expect(iterator.next().value).toEqual(
        call(
          context.firestore.channel,
          path,
          'collection',
          undefined,
          options.snapshotListenOptions,
        ),
      )

      const chan = 'eeeerqd'
      expect(iterator.next(chan)).toEqual({
        done: false,
        value: fork(syncChannel, chan, options),
      })

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('syncDocument(path, options)', () => {
    it('works', () => {
      const path = 'skddksl'
      const options = {}
      const iterator = firestoreModule.syncDocument.call(context, path, options)

      expect(iterator.next().value).toEqual(
        call(context.firestore.channel, path, 'document', undefined, undefined),
      )

      const chan = 'eeeerqd'
      expect(iterator.next(chan)).toEqual({
        done: false,
        value: fork(syncChannel, chan, options),
      })

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })

    it('respects snapshot listen options', () => {
      const path = 'skddksl'
      const options = { snapshotListenOptions: { includeMetadataChanges: true } }
      const iterator = firestoreModule.syncDocument.call(context, path, options)

      expect(iterator.next().value).toEqual(
        call(
          context.firestore.channel,
          path,
          'document',
          undefined,
          options.snapshotListenOptions,
        ),
      )

      const chan = 'eeeerqd'
      expect(iterator.next(chan)).toEqual({
        done: false,
        value: fork(syncChannel, chan, options),
      })

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('updateDocument(documentRef, ...args)', () => {
    it('works', () => {
      const documentRef = 'skddksld'
      const args = ['qlsdl', 'pkqosdqk^']

      const iterator = firestoreModule.updateDocument.call(context, documentRef, ...args)

      expect(iterator.next().value).toEqual(call([document, document.update], ...args))

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('getCollectionRef(rsf, pathOrRef)', () => {
    let collectionRef, firestore, app, rsf

    beforeEach(() => {
      collectionRef = {
        key: 'key',
      }
      firestore = {
        collection: jest.fn(() => collectionRef),
      }
      app = {
        firestore: jest.fn(() => firestore),
      }
      rsf = { app }
    })

    it('returns a collection ref from path string', () => {
      const path = 'path'
      const ref = getCollectionRef(rsf, path)

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.collection.mock.calls.length).toBe(1)
      expect(firestore.collection.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(collectionRef)
    })

    it('returns the collection ref that was passed to it', () => {
      const ref = getCollectionRef(rsf, collectionRef)

      expect(firestore.collection.mock.calls.length).toBe(0)

      expect(ref).toEqual(collectionRef)
    })
  })

  describe('getDocumentRef(rsf, pathOrRef)', () => {
    let documentRef, firestore, app, rsf

    beforeEach(() => {
      documentRef = {
        key: 'key',
      }
      firestore = {
        doc: jest.fn(() => documentRef),
      }
      app = {
        firestore: jest.fn(() => firestore),
      }
      rsf = { app }
    })

    it('returns a collection ref from path string', () => {
      const path = 'path'
      const ref = getDocumentRef(rsf, path)

      expect(app.firestore.mock.calls.length).toBe(1)
      expect(app.firestore.mock.calls[0]).toEqual([])
      expect(firestore.doc.mock.calls.length).toBe(1)
      expect(firestore.doc.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(documentRef)
    })

    it('returns the collection ref that was passed to it', () => {
      const ref = getDocumentRef(rsf, documentRef)

      expect(firestore.doc.mock.calls.length).toBe(0)

      expect(ref).toEqual(documentRef)
    })
  })
})
