import { call } from 'redux-saga/effects'

import dbModule from './database'

describe('database', () => {
  let ref, database, context, subs

  beforeEach(() => {
    subs = []
    ref = {
      off: jest.fn(),
      on: jest.fn((eventType, callback) => {
        subs.push({ eventType, callback })
      }),
      once: jest.fn(),
      push: jest.fn(),
      remove: jest.fn(),
      set: jest.fn(),
      update: jest.fn()
    }
    database = {
      ref: jest.fn(() => ref)
    }
    context = {
      app: {
        database: jest.fn(() => database)
      }
    }
  })

  describe('read(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const val = 'jqdqkld'
      const result = {
        val: jest.fn(() => val)
      }
      const iterator = dbModule.read.call(context, path)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.once], 'value'))

      expect(context.app.database.mock.calls.length).toBe(1)
      expect(context.app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: val
      })

      expect(result.val.mock.calls.length).toBe(1)
      expect(result.val.mock.calls[0]).toEqual([])
    })
  })

  describe('create(path, data)', () => {
    it('works', () => {
      const path = 'skddksl'
      const data = 'okqdkj'
      const result = {
        key: 'qsdklq'
      }
      const iterator = dbModule.create.call(context, path, data)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.push], data))

      expect(context.app.database.mock.calls.length).toBe(1)
      expect(context.app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: result.key
      })
    })
  })

  describe('update(path, data)', () => {
    it('works', () => {
      const path = 'skddksl'
      const data = 'okqdkj'
      const iterator = dbModule.update.call(context, path, data)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.set], data))

      expect(context.app.database.mock.calls.length).toBe(1)
      expect(context.app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('patch(path, data)', () => {
    it('works', () => {
      const path = 'skddksl'
      const data = 'okqdkj'
      const iterator = dbModule.patch.call(context, path, data)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.update], data))

      expect(context.app.database.mock.calls.length).toBe(1)
      expect(context.app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('delete(path)', () => {
    it('works', () => {
      const path = 'skddksl'
      const iterator = dbModule.delete.call(context, path)

      expect(iterator.next().value)
      .toEqual(call([ref, ref.remove]))

      expect(context.app.database.mock.calls.length).toBe(1)
      expect(context.app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('channel(path, event)', () => {
    it('works', () => {
      const path = 'skddksl'
      const event = 'okqdkj'
      dbModule.channel.call(context, path, event)

      expect(context.app.database.mock.calls.length).toBe(1)
      expect(context.app.database.mock.calls[0]).toEqual([])

      expect(database.ref.mock.calls.length).toBe(1)
      expect(database.ref.mock.calls[0]).toEqual([path])

      expect(ref.on.mock.calls.length).toBe(1)
      expect(ref.on.mock.calls[0][0]).toBe(event)
    })

    it('uses "value" for default event type', () => {
      const path = 'path'
      dbModule.channel.call(context, path)

      expect(ref.on.mock.calls.length).toBe(1)
      expect(ref.on.mock.calls[0][0]).toBe('value')
    })

    it('unsubscribes when the channel is closed', () => {
      const path = 'path'
      const event = 'event'
      const channel = dbModule.channel.call(context, path, event)
      channel.close()

      expect(ref.off.mock.calls.length).toBe(1)
      expect(ref.off.mock.calls[0][0]).toBe(event)
    })

    it('emits snapshot data', () => {
      const dataMock = 'snapshot data'
      const val = jest.fn(() => dataMock)
      const snapshot = { val }
      const emit = (snapshot) => {
        subs.forEach(({ callback }) => {
          callback(snapshot)
        })
      }
      const path = 'path'
      const event = 'event'
      const channel = dbModule.channel.call(context, path, event)

      const spy = (data) => {
        expect(data).toEqual(dataMock)
      }

      channel.take(spy)
      emit(snapshot)
    })
  })
})
