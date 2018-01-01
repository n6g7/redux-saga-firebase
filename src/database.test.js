import { call, fork } from 'redux-saga/effects'

import dbModule from './database'
import { syncChannel } from './utils'

describe('database', () => {
  let ref, context, subs

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
    context = {
      _getRef: jest.fn(() => ref),
      database: {
        channel: jest.fn()
      }
    }
  })

  afterEach(() => {
    expect.hasAssertions()
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

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'database'])

      expect(iterator.next(result)).toEqual({
        done: true,
        value: val
      })

      expect(result.val.mock.calls.length).toBe(1)
      expect(result.val.mock.calls[0]).toEqual([])
    })

    it('accepts a firebase.database.Reference argument', () => {
      context._getRef = jest.fn(ref => ref)
      const val = 'jqdqkld'
      const result = {
        val: jest.fn(() => val)
      }
      const iterator = dbModule.read.call(context, ref)

      expect(iterator.next().value)
        .toEqual(call([ref, ref.once], 'value'))

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([ref, 'database'])

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

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'database'])

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

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'database'])

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

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'database'])

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

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'database'])

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

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([path, 'database'])

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
        expect(data).toEqual({
          snapshot: snapshot,
          value: dataMock
        })
      }

      channel.take(spy)
      emit(snapshot)
    })

    it('can emit null values', () => {
      const val = jest.fn(() => null)
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
        expect(data).toEqual({
          snapshot: snapshot,
          value: null
        })
      }

      channel.take(spy)
      emit(snapshot)
    })

    it('can emit undefined values', () => {
      const val = jest.fn(() => undefined)
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
        expect(data).toEqual({
          snapshot: snapshot,
          value: undefined
        })
      }

      channel.take(spy)
      emit(snapshot)
    })

    it('accepts a firebase.database.Reference argument', () => {
      const event = 'okqdkj'
      context._getRef = jest.fn(ref => ref)
      dbModule.channel.call(context, ref, event)

      expect(context._getRef.mock.calls.length).toBe(1)
      expect(context._getRef.mock.calls[0]).toEqual([ref, 'database'])

      expect(ref.on.mock.calls.length).toBe(1)
      expect(ref.on.mock.calls[0][0]).toBe(event)
    })
  })

  describe('sync(path, options, event)', () => {
    it('works', () => {
      const path = 'skddksl'
      const transform = jest.fn()
      const options = { transform }
      const iterator = dbModule.sync.call(context, path, options)

      expect(iterator.next().value)
        .toEqual(call(context.database.channel, path, undefined))

      const chan = 'eeeerqd'
      expect(iterator.next(chan))
        .toEqual({
          done: false,
          value: fork(syncChannel, chan, options)
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
      const iterator = dbModule.sync.call(context, path, { successActionCreator })

      expect(iterator.next().value)
        .toEqual(call(context.database.channel, path, undefined))

      const chan = 'qlsdql'
      const defaultTransform = iterator.next(chan).value.FORK.args[1].transform

      const value = 'qosdksm'
      expect(defaultTransform({ value })).toEqual(value)
    })

    it('accepts a firebase.database.Reference argument', () => {
      context._getRef = jest.fn(ref => ref)
      const transform = jest.fn()
      const options = { transform }
      const iterator = dbModule.sync.call(context, ref, options)

      expect(iterator.next().value)
        .toEqual(call(context.database.channel, ref, undefined))

      const chan = 'eeeerqd'
      expect(iterator.next(chan))
        .toEqual({
          done: false,
          value: fork(syncChannel, chan, options)
        })

      expect(iterator.next())
        .toEqual({
          done: true,
          value: undefined
        })
    })

    it('accepts an optional event type argument', () => {
      context._getRef = jest.fn(ref => ref)
      const transform = jest.fn()
      const options = { transform }
      const event = 'qosdkqlms'
      const iterator = dbModule.sync.call(context, ref, options, event)

      expect(iterator.next().value)
        .toEqual(call(context.database.channel, ref, event))

      const chan = 'eeeerqd'
      expect(iterator.next(chan))
        .toEqual({
          done: false,
          value: fork(syncChannel, chan, options)
        })

      expect(iterator.next())
        .toEqual({
          done: true,
          value: undefined
        })
    })
  })
})
