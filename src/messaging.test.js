import { call, fork } from 'redux-saga/effects'

import messagingModule from './messaging'
import { syncChannel } from './utils'

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

  describe('syncMessages(successActionCreator)', () => {
    it('works', () => {
      const successActionCreator = jest.fn()
      const iterator = messagingModule.syncMessages.call(context, successActionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.messaging.channel))

      const channel = 'jqsdkl'
      expect(iterator.next(channel))
        .toEqual({
          done: false,
          value: fork(syncChannel, channel, successActionCreator)
        })

      expect(iterator.next())
        .toEqual({
          done: true,
          value: undefined
        })
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

  describe('syncToken(successActionCreator)', () => {
    it('works', () => {
      const successActionCreator = jest.fn()
      const iterator = messagingModule.syncToken.call(context, successActionCreator)

      expect(iterator.next().value)
        .toEqual(call(context.messaging.tokenRefreshChannel))

      const channel = 'jqsdkl'
      expect(iterator.next(channel))
        .toEqual({
          done: false,
          value: fork(syncChannel, channel, successActionCreator)
        })

      expect(iterator.next())
        .toEqual({
          done: true,
          value: undefined
        })
    })
  })
})
