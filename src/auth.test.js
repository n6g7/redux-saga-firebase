import { call } from 'redux-saga/effects'

import authModule from './auth'

describe('auth', () => {
  const unsubscribe = jest.fn()

  const auth = {
    onAuthStateChanged: jest.fn(() => unsubscribe),
    signInAnonymously: jest.fn(),
    signInWithPopup: jest.fn(),
    signOut: jest.fn()
  }

  const context = {
    app: {
      auth: jest.fn(() => auth)
    }
  }

  describe('signInAnonymously()', () => {
    it('returns a user', () => {
      const user = 'qosdqkds'
      const iterator = authModule.signInAnonymously.call(context)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInAnonymously]))

      expect(iterator.next(user)).toEqual({
        done: true,
        value: user
      })
    })
  })

  describe('signInWithPopup(authProvider)', () => {
    it('returns credentials', () => {
      const authProvider = 'skqdk'
      const credential = 'qosdqkds'
      const iterator = authModule.signInWithPopup.call(context, authProvider)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithPopup], authProvider))

      expect(iterator.next({ credential })).toEqual({
        done: true,
        value: credential
      })
    })
  })

  describe('logout()', () => {
    it('works', () => {
      const iterator = authModule.logout.call(context)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signOut]))

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('authChannel()', () => {
    it('works', () => {
      const result = authModule.authChannel.call(context)

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1)
      expect(context._authChannel).toBe(result)
    })

    it('returns the cached authChannel if there is one', () => {
      const cachedAuthChannel = 'smldklqd'
      const result = authModule.authChannel.call({
        ...context,
        _authChannel: cachedAuthChannel
      })

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1)
      expect(result).toBe(cachedAuthChannel)
    })

    it('returns a close-able channel', () => {
      const channel = authModule.authChannel.call(context)

      channel.close()
      expect(unsubscribe.mock.calls.length).toBe(1)
    })
  })
})
