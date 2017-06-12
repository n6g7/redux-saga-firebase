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
      }
    }
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
})
