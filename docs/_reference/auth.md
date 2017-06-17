---
title: Authentication
layout: docs
methods:

  - signature: auth.signInAnonymously()
    id: signInAnonymously
    generator: true
    description: Starts the login process as an anonymous user.
    arguments:
    output: A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User.html) instance.
    example: |
      ```javascript
      function* loginSaga() {
        try {
          const data = yield call(rsf.auth.signInAnonymously, authProvider);
          yield put(loginSuccess(data));
        }
        catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

  - signature: auth.signInWithEmailAndPassword(email, password)
    id: signInWithEmailAndPassword
    generator: true
    description: Starts the login process using an email address and password.
    arguments:
      - name: email
        type: String
        description: The user's email address.
      - name: password
        type: String
        description: The user's password.
    output: A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User.html) instance.
    example: |
      ```javascript
      function* loginSaga(email, password) {
        try {
          const data = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
          yield put(loginSuccess(data));
        }
        catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

  - signature: auth.signInWithPopup(authProvider)
    id: signInWithPopup
    generator: true
    description: Starts the login process using the specified AuthProvider.
    arguments:
      - name: authProvider
        type: A [firebase.auth.AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) object.
        description: The authentication provider to use for the request.
    output: A [firebase.auth.AuthCredential](https://firebase.google.com/docs/reference/js/firebase.auth.AuthCredential) instance.
    example: |
      ```javascript
      const authProvider = new firebase.auth.GoogleAuthProvider();

      function* loginSaga() {
        try {
          const data = yield call(rsf.auth.signInWithPopup, authProvider);
          yield put(loginSuccess(data));
        }
        catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

  - signature: auth.signOut()
    id: signOut
    generator: true
    description: Logs the user out.
    arguments:
    output:
    example: |
      ```javascript
      function* signOutSaga() {
        try {
          const data = yield call(rsf.auth.signOut);
          yield put(signOutSuccess(data));
        }
        catch(error) {
          yield put(signOutFailure(error));
        }
      }
      ```

  - signature: auth.channel()
    id: channel
    generator: false
    description: Gets a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every user change.
    arguments:
    output: A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits for every user change.
    example: |
      ```javascript
      function* syncUserSaga() {
        const channel = yield call(rsf.auth.channel);

        while(true) {
          const { error, user } = yield take(channel);

          if (user) yield put(syncUser(user));
          else yield put(syncError(error));
        }
      }
      ```
---
