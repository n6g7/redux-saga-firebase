import { call } from 'redux-saga/effects'

import dbModule from './firestore'

describe('firestore', () => {
  let doc, collection, context

  beforeEach(() => {
    doc = {
      get: jest.fn()
    }
    collection = {
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

  describe('getCollection(collectionRef)', () => {
    it('works', () => {
      const collectionRef = 'skddksl'
      const val = 'asd'
      const result = {
        data: jest.fn(() => val),
        id: val
      }
      const response = [result, result]

      const iterator = dbModule.getCollection.call(context, collectionRef)

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
      const iterator = dbModule.getDocument.call(context, collectionRef, docRef)

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
})
