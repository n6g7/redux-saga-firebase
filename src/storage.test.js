import { call } from 'redux-saga/effects'

import storageModule, { getRef } from './storage'

describe('storage', () => {
  let app, context, ref, storage, task

  task = 'qlsdmlqmd'

  beforeEach(() => {
    ref = {
      delete: jest.fn(),
      getDownloadURL: jest.fn(),
      getMetadata: jest.fn(),
      put: jest.fn(() => task),
      putString: jest.fn(() => task),
      updateMetadata: jest.fn(),
    }
    storage = {
      ref: jest.fn(() => ref),
    }
    app = {
      storage: jest.fn(() => storage),
    }
    context = {
      app,
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

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])
      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

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

      const result = storageModule.uploadString.call(
        context,
        path,
        string,
        format,
        metadata,
      )

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])
      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

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

      expect(iterator.next().value).toEqual(call([ref, ref.getDownloadURL]))

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])
      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(url)).toEqual({
        done: true,
        value: url,
      })
    })
  })

  describe('getFileMetadata(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const metadata = 'nkqkds'
      const iterator = storageModule.getFileMetadata.call(context, path)

      expect(iterator.next().value).toEqual(call([ref, ref.getMetadata]))

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])
      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(metadata)).toEqual({
        done: true,
        value: metadata,
      })
    })
  })

  describe('updateFileMetadata(path, newMetadata)', () => {
    it('works', () => {
      const path = 'skddksl'
      const newMetadata = 'nkqkds'
      const metadata = 'qsdmqdmql'
      const iterator = storageModule.updateFileMetadata.call(context, path, newMetadata)

      expect(iterator.next().value).toEqual(call([ref, ref.updateMetadata], newMetadata))

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])
      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(metadata)).toEqual({
        done: true,
        value: metadata,
      })
    })
  })

  describe('deleteFile(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const iterator = storageModule.deleteFile.call(context, path)

      expect(iterator.next().value).toEqual(call([ref, ref.delete]))

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])
      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined,
      })
    })
  })

  describe('getRef(rsf, pathOrRef)', () => {
    let storageRef, storage, app, rsf

    beforeEach(() => {
      storageRef = {
        bucket: 'bucket',
      }
      storage = {
        ref: jest.fn(() => storageRef),
      }
      app = {
        storage: jest.fn(() => storage),
      }
      rsf = { app }
    })

    it('returns a storage ref from path string', () => {
      const path = 'path'
      const ref = getRef(rsf, path)

      expect(app.storage.mock.calls.length).toBe(1)
      expect(app.storage.mock.calls[0]).toEqual([])

      expect(storage.ref.mock.calls.length).toBe(1)
      expect(storage.ref.mock.calls[0]).toEqual([path])

      expect(ref).toEqual(storageRef)
    })

    it('returns the storage ref that was passed to it', () => {
      const ref = getRef(rsf, storageRef)

      expect(app.storage.mock.calls.length).toBe(0)
      expect(storage.ref.mock.calls.length).toBe(0)

      expect(ref).toEqual(storageRef)
    })
  })
})
