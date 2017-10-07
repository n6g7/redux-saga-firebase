import { channel } from 'redux-saga'
import { call, cancelled, put, take } from 'redux-saga/effects'

import messagingModule from './messaging'

describe('messaging', () => {
  let context
  let messaging
  let unsubscribe
  let subs

  beforeEach(() => {
    subs = []
    unsubscribe = jest.fn()
    messaging = {
      getToken: jest.fn(() => Promise.resolve(token => token)),
      onMessage: jest.fn(() => unsubscribe),
      onTokenRefresh: jest.fn((nextOrObserver) => {
        subs.push(nextOrObserver)
        return unsubscribe
      })
    }
    context = {
      app: {
        messaging: jest.fn(() => messaging)
      },
      messaging: {
        channel: jest.fn(),
        tokenRefreshChannel: jest.fn()
      }
    }
  })

  afterEach(() => {
    expect.hasAssertions()
  })

  describe('channel()', () => {
    it('works', () => {
      const result = messagingModule.channel.call(context)

      expect(context.app.messaging.mock.calls.length).toBe(1)
      expect(context.app.messaging.mock.calls[0]).toEqual([])

      expect(messaging.onMessage.mock.calls.length).toBe(1)

      expect(context._messageChannel).toBe(result)
    })

    it('returns a cached version is available', () => {
      context._messageChannel = 'jlkqjdklqs'
      const result = messagingModule.channel.call(context)

      expect(context.app.messaging.mock.calls.length).toBe(0)
      expect(messaging.onMessage.mock.calls.length).toBe(0)

      expect(context._messageChannel).toBe(result)
    })
  })

  describe('syncMessages(actionCreator)', () => {
    it('works', () => {
      const actionCreator = jest.fn()
      const iterator = messagingModule.syncMessages.call(context, actionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.messaging.channel))

      const channel = 'jqsdkl'
      expect(iterator.next(channel))
        .toEqual({
          done: false,
          value: take(channel)
        })

      let message = 'mes1'
      const action1 = 'psodqp'
      actionCreator.mockReturnValueOnce(action1)
      expect(iterator.next(message))
        .toEqual({
          done: false,
          value: put(action1)
        })
      expect(actionCreator.mock.calls.length).toBe(1)
      expect(actionCreator.mock.calls[0]).toEqual([message])

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      message = 'mes2'
      const action2 = 'djdqsqkp'
      actionCreator.mockReturnValueOnce(action2)
      expect(iterator.next(message))
        .toEqual({
          done: false,
          value: put(action2)
        })
      expect(actionCreator.mock.calls.length).toBe(2)
      expect(actionCreator.mock.calls[1]).toEqual([message])

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

    it('closes the channel when it is cancelled', () => {
      const actionCreator = jest.fn()
      const chan = channel()
      const iterator = messagingModule.syncMessages.call(context, actionCreator)

      // Channel creation
      iterator.next()

      // First take
      iterator.next(chan)

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

  describe('tokenRefreshChannel()', () => {
    it('works', () => {
      const result = messagingModule.tokenRefreshChannel.call(context)

      expect(context.app.messaging.mock.calls.length).toBe(1)
      expect(context.app.messaging.mock.calls[0]).toEqual([])

      expect(messaging.onTokenRefresh.mock.calls.length).toBe(1)

      expect(context._tokenRefreshChannel).toBe(result)
    })

    it('returns a cached version is available', () => {
      context._tokenRefreshChannel = 'sdqmkmslk'
      const result = messagingModule.tokenRefreshChannel.call(context)

      expect(context.app.messaging.mock.calls.length).toBe(0)
      expect(messaging.onTokenRefresh.mock.calls.length).toBe(0)

      expect(context._tokenRefreshChannel).toBe(result)
    })

    it('emits a token', () => {
      const tokenMock = 'token'
      const emit = () => {
        subs.forEach((nextOrObserver) => {
          nextOrObserver()
        })
      }
      const channel = messagingModule.tokenRefreshChannel.call(context)

      const spy = (emitter) => {
        expect(emitter(tokenMock)).toEqual(tokenMock)
      }

      channel.take(spy)
      emit()
    })
  })

  describe('syncToken(actionCreator)', () => {
    it('works', () => {
      const actionCreator = jest.fn()
      const iterator = messagingModule.syncToken.call(context, actionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.messaging.tokenRefreshChannel))

      const channel = 'jqsdkl'
      expect(iterator.next(channel))
        .toEqual({
          done: false,
          value: take(channel)
        })

      let token = 'toktok1'
      const action1 = 'psodqp'
      actionCreator.mockReturnValueOnce(action1)
      expect(iterator.next(token))
        .toEqual({
          done: false,
          value: put(action1)
        })
      expect(actionCreator.mock.calls.length).toBe(1)
      expect(actionCreator.mock.calls[0]).toEqual([token])

      expect(iterator.next())
        .toEqual({
          done: false,
          value: take(channel)
        })

      token = 'toktok2'
      const action2 = 'djdqsqkp'
      actionCreator.mockReturnValueOnce(action2)
      expect(iterator.next(token))
        .toEqual({
          done: false,
          value: put(action2)
        })
      expect(actionCreator.mock.calls.length).toBe(2)
      expect(actionCreator.mock.calls[1]).toEqual([token])

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

    it('closes the channel when it is cancelled', () => {
      const actionCreator = jest.fn()
      const chan = channel()
      const iterator = messagingModule.syncToken.call(context, actionCreator)

      // Channel creation
      iterator.next()

      // First take
      iterator.next(chan)

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
