import messagingModule from './messaging'

describe('messaging', () => {
  let context
  let messaging
  let unsubscribe

  beforeEach(() => {
    unsubscribe = jest.fn()
    messaging = {
      onMessage: jest.fn(() => unsubscribe),
      onTokenRefresh: jest.fn(() => unsubscribe)
    }
    context = {
      app: {
        messaging: jest.fn(() => messaging)
      }
    }
  })

  describe('messageChannel()', () => {
    it('works', () => {
      const result = messagingModule.messageChannel.call(context)

      expect(context.app.messaging.mock.calls.length).toBe(1)
      expect(context.app.messaging.mock.calls[0]).toEqual([])

      expect(messaging.onMessage.mock.calls.length).toBe(1)

      expect(context._messageChannel).toBe(result)
    })

    it('returns a cached version is available', () => {
      context._messageChannel = 'jlkqjdklqs'
      const result = messagingModule.messageChannel.call(context)

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
  })
})
