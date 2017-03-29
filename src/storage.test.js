import { call } from 'redux-saga/effects'

import storageModule from './storage'

describe('storage', () => {
  let ref, storage, context

  beforeEach(() => {
    ref = {
      delete: jest.fn(),
      getDownloadURL: jest.fn(),
      getMetadata: jest.fn(),
      put: jest.fn(),
      putString: jest.fn(),
      updateMetadata: jest.fn()
    }
    storage = {
      ref: jest.fn(() => ref)
    }
    context = {
      app: {
        storage: jest.fn(() => storage)
      }
    }
  })

  describe('upload(path, file, metadata)', () => {
    it('works', () => {
      const path = 'skddksl'
      const file = 'qdmlqssdklq'
      const metadata = 'qpsdksql'
      const task = 'jqldlksq'
      const iterator = storageModule.upload.call(context, path, file, metadata)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.put], file, metadata))

      expect(context.app.storage.mock.calls.length).toBe(1)
      expect(context.app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(task)).toEqual({
        done: true,
        value: task
      })
    })
  })

  describe('uploadString(path, string, format, metadata)', () => {
    it('works', () => {
      const path = 'skddksl'
      const string = 'qdmlqssdklq'
      const format = 'qp^zpq'
      const metadata = 'qpsdksql'
      const task = 'jqldlksq'
      const iterator = storageModule.uploadString.call(context, path, string, format, metadata)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.putString], string, format, metadata))

      expect(context.app.storage.mock.calls.length).toBe(1)
      expect(context.app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(task)).toEqual({
        done: true,
        value: task
      })
    })
  })

  describe('getDownloadURL(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const url = 'nkqkds'
      const iterator = storageModule.getDownloadURL.call(context, path)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.getDownloadURL]))

      expect(context.app.storage.mock.calls.length).toBe(1)
      expect(context.app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

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

      expect(context.app.storage.mock.calls.length).toBe(1)
      expect(context.app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

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

      expect(context.app.storage.mock.calls.length).toBe(1)
      expect(context.app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

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

      expect(context.app.storage.mock.calls.length).toBe(1)
      expect(context.app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })
})
