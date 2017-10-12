import { call } from 'redux-saga/effects'

import firestoreModule from './firestore'

describe('firestore', () => {
  let doc, collection, context

  beforeEach(() => {
    doc = {
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn()
    }
    collection = {
      add: jest.fn(),
      doc: jest.fn(() => doc),
      get: jest.fn()
    }
    context = {
      _getCollection: jest.fn(() => collection)
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

  describe('deleteDocument(collectionRef, documentRef)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const documentRef = 'qplsmdkqlm'

      const iterator = firestoreModule.deleteDocument.call(context, collectionRef, documentRef)

      expect(iterator.next().value)
        .toEqual(call([doc, doc.delete]))

      expect(context._getCollection.mock.calls.length).toBe(1)
      expect(context._getCollection.mock.calls[0]).toEqual([collectionRef])

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

  describe('getDocument(collectionRef, docRef)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const docRef = 'skddksld'
      const val = 'jqdqkld'
      const result = {
        data: jest.fn(() => val),
        id: 0
      }
      const iterator = firestoreModule.getDocument.call(context, collectionRef, docRef)

      expect(iterator.next().value)
        .toEqual(call([doc, doc.get]))

      expect(context._getCollection.mock.calls.length).toBe(1)
      expect(context._getCollection.mock.calls[0]).toEqual([collectionRef])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result
      })
    })
  })

  describe('setDocument(collectionRef, docRef, data, options)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const docRef = 'skddksld'
      const data = 'qlsdl'
      const options = 'oqskdqm'

      const iterator = firestoreModule.setDocument.call(
        context,
        collectionRef,
        docRef,
        data,
        options
      )

      expect(iterator.next().value)
        .toEqual(call([doc, doc.set], data, options))

      expect(context._getCollection.mock.calls.length).toBe(1)
      expect(context._getCollection.mock.calls[0]).toEqual([collectionRef])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })
})
