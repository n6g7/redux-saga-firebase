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

  describe('syncChannel(actionCreator)', () => {
    let context

    beforeEach(() => {
      context = {}
    })

    it('works', () => {
      const channel = 'qposdqpsdl'
      const actionCreator = jest.fn()
      const iterator = syncChannel.call(context, channel, actionCreator)

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      let data = 'abc'
      let transformedData = 'def'
      const action1 = 'psodqp'
      actionCreator.mockReturnValueOnce(action1)

      expect(iterator.next(data))
        .toEqual({
          done: false,
          value: put(action1)
        })
      expect(actionCreator.mock.calls.length).toBe(1)
      expect(actionCreator.mock.calls[0]).toEqual([data])

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      data = 'ghi'
      transformedData = 'jkl'
      const action2 = 'djdqsqkp'
      actionCreator.mockReturnValueOnce(action2)
      expect(iterator.next(data))
        .toEqual({
          done: false,
          value: put(action2)
        })
      expect(actionCreator.mock.calls.length).toBe(2)
      expect(actionCreator.mock.calls[1]).toEqual([data])

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
      const actionCreator = jest.fn()
      const transform = jest.fn()
      const iterator = syncChannel.call(context, channel, actionCreator, transform)

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      let value = 'value1'
      const transformed = 'transformed'
      transform.mockReturnValueOnce(transformed)
      const action = 'psodqp'
      actionCreator.mockReturnValueOnce(action)
      expect(iterator.next(value))
        .toEqual({
          done: false,
          value: put(action)
        })
      expect(transform.mock.calls.length).toBe(1)
      expect(transform.mock.calls[0]).toEqual([value])
      expect(actionCreator.mock.calls.length).toBe(1)
      expect(actionCreator.mock.calls[0]).toEqual([transformed])
    })

    it('closes the channel when it is cancelled', () => {
      const chan = channel()
      const actionCreator = jest.fn()
      const iterator = syncChannel.call(context, chan, actionCreator)

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
  })
})
