import { call, fork } from 'redux-saga/effects'

import firestoreModule from './firestore'
import { syncChannel } from './utils'

describe('firestore', () => {
  let document, collection, context, unsubscribe

  beforeEach(() => {
    unsubscribe = jest.fn()
    document = {
      delete: jest.fn(),
      get: jest.fn(),
      onSnapshot: jest.fn(() => unsubscribe),
      set: jest.fn(),
      update: jest.fn()
    }
    collection = {
      add: jest.fn(),
      doc: jest.fn(() => document),
      get: jest.fn(),
      onSnapshot: jest.fn(() => unsubscribe)
    }
    context = {
      _getCollection: jest.fn(() => collection),
      _getDocument: jest.fn(() => document),
      firestore: {
        channel: jest.fn()
      }
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

      expect(iterator.next().value)
        .toEqual(call([collection, collection.add], data))

      expect(context._getCollection.mock.calls.length).toBe(1)
      expect(context._getCollection.mock.calls[0]).toEqual([collectionRef])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
      })
    })
  })

  describe('channel(path, type)', () => {
    it('works for collections', () => {
      const path = 'skddksl'
      const type = 'collection'
      firestoreModule.channel.call(context, path, type)

      expect(context._getCollection.mock.calls.length).toBe(1)
      expect(context._getCollection.mock.calls[0]).toEqual([path])

      expect(collection.onSnapshot.mock.calls.length).toBe(1)
    })

    it('works for documents', () => {
      const path = 'skddksl'
      const type = 'document'
      firestoreModule.channel.call(context, path, type)

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([path])

      expect(document.onSnapshot.mock.calls.length).toBe(1)
    })

    it('uses "collection" for default type', () => {
      const path = 'path'
      firestoreModule.channel.call(context, path)

      expect(context._getCollection.mock.calls.length).toBe(1)
    })

    it('unsubscribes when the channel is closed', () => {
      const path = 'path'
      const type = 'type'
      const channel = firestoreModule.channel.call(context, path, type)
      channel.close()

      expect(unsubscribe.mock.calls.length).toBe(1)
    })
  })

  describe('deleteDocument(documentRef)', () => {
    it('works', () => {
      const documentRef = 'qplsmdkqlm'

      const iterator = firestoreModule.deleteDocument.call(context, documentRef)

      expect(iterator.next().value)
        .toEqual(call([document, document.delete]))

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('getCollection(collectionRef)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const val = 'asd'
      const result = {
        data: jest.fn(() => val),
        id: val
      }
      const response = [result, result]

      const iterator = firestoreModule.getCollection.call(context, collectionRef)

      expect(iterator.next().value)
        .toEqual(call([collection, collection.get]))

      expect(context._getCollection.mock.calls.length).toBe(1)
      expect(context._getCollection.mock.calls[0]).toEqual([collectionRef])

      expect(iterator.next(response)).toEqual({
        done: true,
        value: response
      })
    })
  })

  describe('getDocument(documentRef)', () => {
    it('works', () => {
      const documentRef = 'skddksld'
      const val = 'jqdqkld'
      const result = {
        data: jest.fn(() => val),
        id: 0
      }
      const iterator = firestoreModule.getDocument.call(context, documentRef)

      expect(iterator.next().value)
        .toEqual(call([document, document.get]))

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
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
        options
      )

      expect(iterator.next().value)
        .toEqual(call([document, document.set], data, options))

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('syncCollection(path, successActionCreator, transform), failureActionCreator', () => {
    it('works', () => {
      const path = 'skddksl'
      const successActionCreator = jest.fn()
      const failureActionCreator = jest.fn()
      const transform = jest.fn()
      const iterator = firestoreModule.syncCollection.call(context, path, successActionCreator, transform, failureActionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.firestore.channel, path, 'collection'))

      const chan = 'eeeerqd'
      expect(iterator.next(chan))
        .toEqual({
          done: false,
          value: fork(syncChannel, chan, successActionCreator, transform, failureActionCreator)
        })

      expect(iterator.next())
        .toEqual({
          done: true,
          value: undefined
        })
    })

    it('provides a sensible transform default', () => {
      const path = 'skddksl'
      const successActionCreator = jest.fn()
      const iterator = firestoreModule.syncCollection.call(context, path, successActionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.firestore.channel, path, 'collection'))

      const chan = 'qlsdql'
      const defaultTransform = iterator.next(chan).value.FORK.args[2]

      const value = 'qosdksm'
      expect(defaultTransform(value)).toEqual(value)
    })
  })

  describe('syncDocument(path, successActionCreator, transform, failureActionCreator)', () => {
    it('works', () => {
      const path = 'skddksl'
      const successActionCreator = jest.fn()
      const failureActionCreator = jest.fn()
      const transform = jest.fn()
      const iterator = firestoreModule.syncDocument.call(context, path, successActionCreator, transform, failureActionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.firestore.channel, path, 'document'))

      const chan = 'eeeerqd'
      expect(iterator.next(chan))
        .toEqual({
          done: false,
          value: fork(syncChannel, chan, successActionCreator, transform, failureActionCreator)
        })

      expect(iterator.next())
        .toEqual({
          done: true,
          value: undefined
        })
    })

    it('provides a sensible transform default', () => {
      const path = 'skddksl'
      const successActionCreator = jest.fn()
      const iterator = firestoreModule.syncDocument.call(context, path, successActionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.firestore.channel, path, 'document'))

      const chan = 'qlsdql'
      const defaultTransform = iterator.next(chan).value.FORK.args[2]

      const value = 'qosdksm'
      expect(defaultTransform(value)).toEqual(value)
    })
  })

  describe('updateDocument(documentRef, ...args)', () => {
    it('works', () => {
      const documentRef = 'skddksld'
      const args = ['qlsdl', 'pkqosdqk^']

      const iterator = firestoreModule.updateDocument.call(
        context,
        documentRef,
        ...args
      )

      expect(iterator.next().value)
        .toEqual(call([document, document.update], ...args))

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })
})
