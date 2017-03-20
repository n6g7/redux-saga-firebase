import { call } from 'redux-saga/effects';

import appp from './auth';

describe('auth', () => {
  const unsubscribe = jest.fn();

  const auth = {
    onAuthStateChanged: jest.fn(() => unsubscribe),
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
  };

  const context = {
    app: {
      auth: jest.fn(() => auth)
    }
  };

  describe('login(authProvider)', () => {
    it('returns credentials', () => {
      const authProvider = 'skqdk';
      const credential = 'qosdqkds';
      const iterator = appp.login.call(context, authProvider);

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signInWithPopup], authProvider));

      expect(iterator.next({ credential })).toEqual({
        done: true,
        value: credential
      });
    });
  });

  describe('logout()', () => {
    it('works', () => {
      const iterator = appp.logout.call(context);

      expect(iterator.next().value)
      .toEqual(call([auth, auth.signOut]));

      expect(iterator.next()).toEqual({
        done: true,
        value: undefined
      });
    });
  });

  describe('authChannel()', () => {
    it('works', () => {
      const result = appp.authChannel.call(context);

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1);
      expect(context._authChannel).toBe(result);
    });

    it('returns the cached authChannel if there is one', () => {
      const cachedAuthChannel = 'smldklqd';
      const result = appp.authChannel.call({
        ...context,
        _authChannel: cachedAuthChannel
      });

      expect(auth.onAuthStateChanged.mock.calls.length).toBe(1);
      expect(result).toBe(cachedAuthChannel);
    });
  });
});
