import { channel } from 'redux-saga'
import { cancelled, put, take } from 'redux-saga/effects'
import { noop, syncChannel } from './utils'

describe('utils', () => {
  afterEach(() => {
    expect.hasAssertions()
  })

  describe('noop()', () => {
    it('works', () => {
      const arg = 'skddksl'
      const result = noop(arg)

      expect(result).toEqual(arg)
    })
  })

  describe('syncChannel(successActionCreator)', () => {
    let context

    beforeEach(() => {
      context = {}
    })

    it('works', () => {
      const channel = 'qposdqpsdl'
      const successActionCreator = jest.fn()
      const iterator = syncChannel.call(context, channel, successActionCreator)

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      let data = 'abc'
      const action1 = 'psodqp'
      successActionCreator.mockReturnValueOnce(action1)

      expect(iterator.next(data))
        .toEqual({
          done: false,
          value: put(action1)
        })
      expect(successActionCreator.mock.calls.length).toBe(1)
      expect(successActionCreator.mock.calls[0]).toEqual([data])

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      data = 'ghi'
      const action2 = 'djdqsqkp'
      successActionCreator.mockReturnValueOnce(action2)
      expect(iterator.next(data))
        .toEqual({
          done: false,
          value: put(action2)
        })
      expect(successActionCreator.mock.calls.length).toBe(2)
      expect(successActionCreator.mock.calls[1]).toEqual([data])

      expect(iterator.return())
        .toEqual({
          done: false,
          value: cancelled()
        })

      expect(iterator.next(false))
        .toEqual({
          done: true,
          value: undefined
        })
    })

    it('uses the specified transform function', () => {
      const channel = 'qposdqpsdl'
      const successActionCreator = jest.fn()
      const transform = jest.fn()
      const iterator = syncChannel.call(context, channel, successActionCreator, transform)

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      let value = 'value1'
      const transformed = 'transformed'
      transform.mockReturnValueOnce(transformed)
      const action = 'psodqp'
      successActionCreator.mockReturnValueOnce(action)
      expect(iterator.next(value))
        .toEqual({
          done: false,
          value: put(action)
        })
      expect(transform.mock.calls.length).toBe(1)
      expect(transform.mock.calls[0]).toEqual([value])
      expect(successActionCreator.mock.calls.length).toBe(1)
      expect(successActionCreator.mock.calls[0]).toEqual([transformed])
    })

    it('closes the channel when it is cancelled', () => {
      const chan = channel()
      const successActionCreator = jest.fn()
      const iterator = syncChannel.call(context, chan, successActionCreator)

      // First take
      iterator.next()

      // This gets us in the finally block
      expect(iterator.return())
        .toEqual({
          done: false,
          value: cancelled()
        })

      chan.close = jest.fn()
      iterator.next(true)

      expect(chan.close).toHaveBeenCalledTimes(1)
    })

    it('dispatch failureActionCreator on error', () => {
      const chan = channel()
      const successActionCreator = jest.fn()
      const failureActionCreator = jest.fn()
      const transform = jest.fn()
      const error = 'asdfasdf'
      const iterator = syncChannel.call(context, chan, successActionCreator, transform, failureActionCreator)

      // First take
      iterator.next()

      const action = 'psodqp'
      failureActionCreator.mockReturnValueOnce(action)

      // This gets us in the catch block
      expect(iterator.throw(error))
        .toEqual({
          done: false,
          value: put(action)
        })

      expect(failureActionCreator.mock.calls.length).toBe(1)
      expect(failureActionCreator.mock.calls[0]).toEqual([error])
    })

    it('do not dispatch on error if no failureActionCreator', () => {
      const chan = channel()
      const successActionCreator = jest.fn()
      const error = 'asdfasdf'
      const iterator = syncChannel.call(context, chan, successActionCreator)

      // First take
      iterator.next()

      // This gets us in the catch block
      expect(iterator.throw(error))
        .toEqual({
          done: false,
          value: cancelled()
        })

      chan.close = jest.fn()
      iterator.next(true)

      expect(chan.close).toHaveBeenCalledTimes(1)
    })
  })
})
