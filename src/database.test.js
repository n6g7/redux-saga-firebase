import { call, put, take } from 'redux-saga/effects'

import dbModule from './database'

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
  })

  describe('sync(path, actionCreator, transform)', () => {
    it('works', () => {
      const path = 'skddksl'
      const actionCreator = jest.fn()
      const iterator = dbModule.sync.call(context, path, actionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.database.channel, path))

      const channel = 'jqsdkl'
      expect(iterator.next(channel))
        .toEqual({
          done: false,
          value: take(channel)
        })

      let value = 'value1'
      const action1 = 'psodqp'
      actionCreator.mockReturnValueOnce(action1)
      expect(iterator.next({ value }))
        .toEqual({
          done: false,
          value: put(action1)
        })
      expect(actionCreator.mock.calls.length).toBe(1)
      expect(actionCreator.mock.calls[0]).toEqual([value])

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      value = 'value2'
      const action2 = 'djdqsqkp'
      actionCreator.mockReturnValueOnce(action2)
      expect(iterator.next({ value }))
        .toEqual({
          done: false,
          value: put(action2)
        })
      expect(actionCreator.mock.calls.length).toBe(2)
      expect(actionCreator.mock.calls[1]).toEqual([value])
    })

    it('uses the specified transform function', () => {
      const path = 'skddksl'
      const actionCreator = jest.fn()
      const transform = jest.fn()
      const iterator = dbModule.sync.call(context, path, actionCreator, transform)

      expect(iterator.next().value)
        .toEqual(call(context.database.channel, path))

      const channel = 'jqsdkl'
      expect(iterator.next(channel))
        .toEqual({
          done: false,
          value: take(channel)
        })

      let value = 'value1'
      const transformed = 'transformed'
      transform.mockReturnValueOnce(transformed)
      const action = 'psodqp'
      actionCreator.mockReturnValueOnce(action)
      expect(iterator.next({ value }))
        .toEqual({
          done: false,
          value: put(action)
        })
      expect(transform.mock.calls.length).toBe(1)
      expect(transform.mock.calls[0]).toEqual([value])
      expect(actionCreator.mock.calls.length).toBe(1)
      expect(actionCreator.mock.calls[0]).toEqual([transformed])
    })
  })
})
