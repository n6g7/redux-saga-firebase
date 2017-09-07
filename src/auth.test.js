import { call } from 'redux-saga/effects'

import authModule from './auth'

describe('auth', () => {
  const unsubscribe = jest.fn()

  const subs = []

  const auth = {
    onAuthStateChanged: jest.fn((nextOrObserver, error) => {
      subs.push({ nextOrObserver, error })
      return unsubscribe
    }),
    signInAndRetrieveDataWithCredential: jest.fn(),
    signInAnonymously: jest.fn(),
    signInWithCredential: jest.fn(),
    signInWithCustomToken: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPhoneNumber: jest.fn(),
    signInWithPopup: jest.fn(),
    signInWithRedirect: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    applyActionCode: jest.fn(),
    signOut: jest.fn()
  }

  const context = {
    app: {
      auth: jest.fn(() => auth)
    }
  }

  afterEach(() => {
    expect.hasAssertions()
  })

  describe('signInAndRetrieveDataWithCredential(credential)', () => {
    it('returns user credentials', () => {
      const credential = 'pqdiqjsdk'
      const userCredentials = 'qosdqkds'
      const iterator = authModule.signInAndRetrieveDataWithCredential.call(context, credential)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInAndRetrieveDataWithCredential], credential))

      expect(iterator.next(userCredentials)).toEqual({
        done: true,
        value: userCredentials
      })
    })
  })

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

  describe('signInWithCredential(credential)', () => {
    it('returns a user', () => {
      const user = 'qosdqkds'
      const credential = 'qpsdkqdsql'
      const iterator = authModule.signInWithCredential.call(context, credential)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithCredential], credential))

      expect(iterator.next(user)).toEqual({
        done: true,
        value: user
      })
    })
  })

  describe('signInWithCustomToken(token)', () => {
    it('returns a user', () => {
      const user = 'qosdqkds'
      const token = 'qpsdkqdsql'
      const iterator = authModule.signInWithCustomToken.call(context, token)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithCustomToken], token))

      expect(iterator.next(user)).toEqual({
        done: true,
        value: user
      })
    })
  })

  describe('signInWithEmailAndPassword(email, password)', () => {
    it('returns a user', () => {
      const email = 'skqdk'
      const password = 'skqdk'
      const user = 'qosdqkds'
      const iterator = authModule.signInWithEmailAndPassword.call(context, email, password)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithEmailAndPassword], email, password))

      expect(iterator.next(user)).toEqual({
        done: true,
        value: user
      })
    })
  })

  describe('signInWithPhoneNumber(phoneNumber, applicationVerifier)', () => {
    it('returns a confirmation result', () => {
      const phoneNumber = 'skqdk'
      const applicationVerifier = 'lqksdqkd'
      const iterator = authModule.signInWithPhoneNumber.call(context, phoneNumber, applicationVerifier)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithPhoneNumber], phoneNumber, applicationVerifier))

      const confirmationResult = 'oqsdoqpdl'
      expect(iterator.next(confirmationResult)).toEqual({
        done: true,
        value: confirmationResult
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

  describe('signInWithRedirect(authProvider)', () => {
    it('returns nothing', () => {
      const authProvider = 'skqdk'
      const iterator = authModule.signInWithRedirect.call(context, authProvider)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithRedirect], authProvider))

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('createUserWithEmailAndPassword(email, password)', () => {
    it('returns a user', () => {
      const email = 'skqdk'
      const password = 'skqdk'
      const user = 'qosdqkds'
      const iterator = authModule.createUserWithEmailAndPassword.call(
        context,
        email,
        password
      )

      expect(iterator.next().value).toEqual(
        call([auth, auth.createUserWithEmailAndPassword], email, password)
      )

      expect(iterator.next(user)).toEqual({
        done: true,
        value: user
      })
    })
  })

  describe('applyActionCode(code)', () => {
    it('returns a user', () => {
      const code = 'skqdk'
      const iterator = authModule.applyActionCode.call(
        context,
        code
      )

      expect(iterator.next().value).toEqual(
        call([auth, auth.applyActionCode], code)
      )

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('signOut()', () => {
    it('works', () => {
      const iterator = authModule.signOut.call(context)

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signOut]))

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('channel()', () => {
    it('works', () => {
      const result = authModule.channel.call(context)

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1)
      expect(context._authChannel).toBe(result)
    })

    it('returns the cached authChannel if there is one', () => {
      const cachedAuthChannel = 'smldklqd'
      const result = authModule.channel.call({
        ...context,
        _authChannel: cachedAuthChannel
      })

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1)
      expect(result).toBe(cachedAuthChannel)
    })

    it('returns a close-able channel', () => {
      const channel = authModule.channel.call(context)

      channel.close()
      expect(unsubscribe.mock.calls.length).toBe(1)
    })

    it('emits user or error', () => {
      const userMock = {uid: 'uid'}
      const errorMock = {code: 'auth/error-code'}
      const emit = (user, authError) => {
        subs.forEach(({ nextOrObserver, error }) => {
          if (user) {
            nextOrObserver(user)
          }
          if (authError) {
            error(authError)
          }
        })
      }
      const channel = authModule.channel.call({
        ...context,
        // reset memoized channel
        _authChannel: null
      })

      const userSpy = ({ user }) => {
        expect(user).toEqual(userMock)
      }
      channel.take(userSpy)
      emit(userMock, null)

      const errorSpy = ({ error }) => {
        expect(error).toEqual(errorMock)
      }
      channel.take(errorSpy)
      emit(null, errorMock)
    })
  })
})
