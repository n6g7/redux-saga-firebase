import { call } from 'redux-saga/effects'

import storageModule from './storage'

describe('storage', () => {
  let ref, task, context

  task = 'qlsdmlqmd'

  beforeEach(() => {
    ref = {
      delete: jest.fn(),
      getDownloadURL: jest.fn(),
      getMetadata: jest.fn(),
      put: jest.fn(() => task),
      putString: jest.fn(() => task),
      updateMetadata: jest.fn()
    }
    context = {
      _getRef: jest.fn(() => ref)
    }
  })

  afterEach(() => {
    expect.hasAssertions()
  })

  describe('uploadFile(path, file, metadata)', () => {
    it('works', () => {
      const path = 'skddksl'
      const file = 'qdmlqssdklq'
      const metadata = 'qpsdksql'

      const result = storageModule.uploadFile.call(context, path, file, metadata)

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'storage'])

      expect(ref.put.mock.calls.length).toBe(1)
      expect(ref.put.mock.calls[0]).toEqual([file, metadata])

      expect(result).toEqual(task)
    })
  })

  describe('uploadString(path, string, format, metadata)', () => {
    it('works', () => {
      const path = 'skddksl'
      const string = 'qdmlqssdklq'
      const format = 'qp^zpq'
      const metadata = 'qpsdksql'

      const result = storageModule.uploadString.call(context, path, string, format, metadata)

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'storage'])

      expect(ref.putString.mock.calls.length).toBe(1)
      expect(ref.putString.mock.calls[0]).toEqual([string, format, metadata])

      expect(result).toEqual(task)
    })
  })

  describe('getDownloadURL(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const url = 'nkqkds'
      const iterator = storageModule.getDownloadURL.call(context, path)

      expect(iterator.next().value)
        .toEqual(call([ref, ref.getDownloadURL]))

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'storage'])

      expect(iterator.next(url)).toEqual({
        done: true,
        value: url
      })
    })
  })

  describe('getFileMetadata(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const metadata = 'nkqkds'
      const iterator = storageModule.getFileMetadata.call(context, path)

      expect(iterator.next().value)
        .toEqual(call([ref, ref.getMetadata]))

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'storage'])

      expect(iterator.next(metadata)).toEqual({
        done: true,
        value: metadata
      })
    })
  })

  describe('updateFileMetadata(path, newMetadata)', () => {
    it('works', () => {
      const path = 'skddksl'
      const newMetadata = 'nkqkds'
      const metadata = 'qsdmqdmql'
      const iterator = storageModule.updateFileMetadata.call(context, path, newMetadata)

      expect(iterator.next().value)
        .toEqual(call([ref, ref.updateMetadata], newMetadata))

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'storage'])

      expect(iterator.next(metadata)).toEqual({
        done: true,
        value: metadata
      })
    })
  })

  describe('deleteFile(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const iterator = storageModule.deleteFile.call(context, path)

      expect(iterator.next().value)
        .toEqual(call([ref, ref.delete]))

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'storage'])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })
})
