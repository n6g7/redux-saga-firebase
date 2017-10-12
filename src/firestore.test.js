import { call } from 'redux-saga/effects'

import firestoreModule from './firestore'

describe('firestore', () => {
  let doc, collection, context

  beforeEach(() => {
    doc = {
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      update: jest.fn()
    }
    collection = {
      add: jest.fn(),
      doc: jest.fn(() => doc),
      get: jest.fn()
    }
    context = {
      _getCollection: jest.fn(() => collection),
      _getDocument: jest.fn(() => doc)
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

  describe('deleteDocument(documentRef)', () => {
    it('works', () => {
      const documentRef = 'qplsmdkqlm'

      const iterator = firestoreModule.deleteDocument.call(context, documentRef)

      expect(iterator.next().value)
        .toEqual(call([doc, doc.delete]))

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
        .toEqual(call([doc, doc.get]))

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
        .toEqual(call([doc, doc.set], data, options))

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
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
        .toEqual(call([doc, doc.update], ...args))

      expect(context._getDocument.mock.calls.length).toBe(1)
      expect(context._getDocument.mock.calls[0]).toEqual([documentRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })
})
