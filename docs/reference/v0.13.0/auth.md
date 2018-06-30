---
title: Authentication
layout: docs
methods:

  - signature: auth.applyActionCode(code)
    id: applyActionCode
    generator: true
    description: Applies a verification code sent to the user by email or other out-of-band mechanism.
    arguments:
      - name: code
        required: true
        type: String
        description: A verification code sent to the user.
    example: |
      ```javascript
      function* applyActionCodeSaga(code) {
        try {
          yield call(rsf.auth.applyActionCode, code);
          yield put(applyActionCodeSuccess());
        }
        catch(error) {
          yield put(applyActionCodeFailure(error));
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

  - signature: auth.confirmPasswordReset(code, newPassword)
    id: confirmPasswordReset
    generator: true
    description: Completes the password reset process, given a confirmation code and new password.
    arguments:
      - name: code
        required: true
        type: String
        description: The confirmation code send via email to the user.
      - name: newPassword
        required: true
        type: String
        description: The new password.
    example: |
      ```javascript
      function* confirmPasswordResetSaga(code, newPassword) {
        try {
          yield call(rsf.auth.confirmPasswordReset, code, newPassword);
          yield put(confirmPasswordResetSuccess());
        }
        catch(error) {
          yield put(confirmPasswordResetFailure(error));
        }
      }
      ```

  - signature: auth.createUserWithEmailAndPassword(email, password)
    id: createUserWithEmailAndPassword
    generator: true
    description: Creates a new user account associated with the specified email address and password.
    arguments:
      - name: email
        required: true
        type: String
        description: The user's email address.
      - name: password
        required: true
        type: String
        description: The user's password.
    output: A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User.html) instance.
    example: |
      ```javascript
      function* createUserSaga(email, password) {
        try {
          const user = yield call(rsf.auth.createUserWithEmailAndPassword, email, password);
          yield put(createUserSuccess(user));
        }
        catch(error) {
          yield put(createUserFailure(error));
        }
      }
      ```

  - signature: auth.linkWithPopup(authProvider)
    id: linkWithPopup
    generator: true
    description: Links the authenticated provider to the user account using a pop-up based OAuth flow.
    arguments:
      - name: authProvider
        required: true
        type: A [firebase.auth.AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) object.
        description: The authentication provider to use for the request.
    output: A [firebase.auth.UserCredential](https://firebase.google.com/docs/reference/js/firebase.auth#.UserCredential) instance.
    example: |
      ```javascript
      const authProvider = new firebase.auth.GoogleAuthProvider();

      function* linkSaga() {
        try {
          const data = yield call(rsf.auth.linkWithPopup, authProvider);
          yield put(linkSuccess(data));
        } catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

  - signature: auth.linkWithRedirect(authProvider)
    id: linkWithRedirect
    generator: true
    description: Links the authenticated provider to the user account using a full-page redirect flow.
    arguments:
      - name: authProvider
        required: true
        type: A [firebase.auth.AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) object.
        description: The authentication provider to use for the request.
    example: |
      ```javascript
      const authProvider = new firebase.auth.GoogleAuthProvider();

      function* linkSaga() {
        try {
          yield call(rsf.auth.linkWithRedirect, authProvider);
        } catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

  - signature: auth.sendEmailVerification(actionCodeSettings)
    id: sendEmailVerification
    generator: true
    description: Sends a verification email to a user.
    arguments:
      - name: actionCodeSettings
        required: false
        type: An [firebase.auth.ActionCodeSettings](https://firebase.google.com/docs/reference/js/firebase.auth.html#.ActionCodeSettings)
        description: The action code settings.
    example: |
      ```javascript
      function* emailVerificationSaga(actionCodeSettings) {
        try {
          yield call(rsf.auth.sendEmailVerification, actionCodeSettings);
          yield put(emailVerificationSendSuccess());
        }
        catch(error) {
          yield put(emailVerificationSendFailure(error));
        }
      }
      ```

  - signature: auth.sendPasswordResetEmail(email, actionCodeSettings)
    id: sendPasswordResetEmail
    generator: true
    description: Sends a password reset email to the given email address.
    arguments:
      - name: email
        required: true
        type: String
        description: The email address with the password to be reset.
      - name: actionCodeSettings
        required: false
        type: An [firebase.auth.ActionCodeSettings](https://firebase.google.com/docs/reference/js/firebase.auth.html#.ActionCodeSettings)
        description: The action code settings.
    example: |
      ```javascript
      function* sendPasswordResetEmailSaga(email, actionCodeSettings) {
        try {
          yield call(rsf.auth.sendPasswordResetEmail, email, actionCodeSettings);
          yield put(sendPasswordResetEmailSuccess());
        }
        catch(error) {
          yield put(sendPasswordResetEmailFailure(error));
        }
      }
      ```

  - signature: auth.signInAndRetrieveDataWithCredential(credential)
    id: signInAndRetrieveDataWithCredential
    generator: true
    description: Starts the login process with the given credentials and returns any available additional user information, such as user name.
    arguments:
      - name: credential
        required: true
        type: A [firebase.auth.AuthCredential](https://firebase.google.com/docs/reference/js/firebase.auth.AuthCredential.html)
        description: The authentication credential.
    output: A [firebase.auth.UserCredential](https://firebase.google.com/docs/reference/js/firebase.auth#.UserCredential) instance.
    example: |
      ```javascript
      function* loginSaga() {
        const credential = yield select(...)
        try {
          const userCredentials = yield call(rsf.auth.signInAndRetrieveDataWithCredential, credential);
          yield put(loginSuccess(userCredentials));
        }
        catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

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

  - signature: auth.signInWithCredential(credential)
    id: signInWithCredential
    generator: true
    description: Starts the login process with the given credentials.
    arguments:
      - name: credential
        required: true
        type: A [firebase.auth.AuthCredential](https://firebase.google.com/docs/reference/js/firebase.auth.AuthCredential.html)
        description: The authentication credential.
    output: A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User.html) instance.
    example: |
      ```javascript
      function* loginSaga() {
        const credential = yield select(...)
        try {
          const user = yield call(rsf.auth.signInWithCredential, credential);
          yield put(loginSuccess(user));
        }
        catch(error) {
          yield put(loginFailure(error));
        }
      }
      ```

  - signature: auth.signInWithCustomToken(token)
    id: signInWithCustomToken
    generator: true
    description: Starts the login process using a custom token.
    arguments:
      - name: token
        required: true
        type: String
        description: The custom token to sign in with.
    output: A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User.html) instance.
    example: |
      ```javascript
      function* loginSaga() {
        const token = yield select(...)
        try {
          const user = yield call(rsf.auth.signInWithCustomToken, token);
          yield put(loginSuccess(user));
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
        required: true
        type: String
        description: The user's email address.
      - name: password
        required: true
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

  - signature: auth.signInWithPhoneNumber(phoneNumber, applicationVerifier)
    id: signInWithPhoneNumber
    generator: true
    description: Starts the login process using the specified phone number.
    arguments:
      - name: phoneNumber
        required: true
        type: String
        description: The user's phone number in E.164 format (e.g. +16505550101).
      - name: applicationVerifier
        required: true
        type: A [firebase.auth.ApplicationVerifier](https://firebase.google.com/docs/reference/js/firebase.auth.ApplicationVerifier)
        description: The verifier to use.
    output: A [firebase.auth.ConfirmationResult](https://firebase.google.com/docs/reference/js/firebase.auth.ConfirmationResult) instance.
    example: |
      ```javascript
      const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

      function* loginSaga() {
        const phoneNumber = yield select(state => ...)

        try {
          const confirmationResult = yield call(rsf.auth.signInWithPhoneNumber, phoneNumber, applicationVerifier);
          const verificationCode = /* implement your own logic to get the user's verification code */
          const credentials = yield call(confirmationResult.confirm, verificationCode);
          yield put(loginSuccess(credentials));
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
        required: true
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

  - signature: auth.signInWithRedirect(authProvider)
    id: signInWithRedirect
    generator: true
    description: Starts the login process using the specified AuthProvider.
    arguments:
      - name: authProvider
        required: true
        type: A [firebase.auth.AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) object.
        description: The authentication provider to use for the request.
    output:
    example: |
      ```javascript
      const authProvider = new firebase.auth.GoogleAuthProvider();

      function* loginSaga() {
        try {
          yield call(rsf.auth.signInWithRedirect, authProvider);
          yield put(loginSuccess());
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

  - signature: auth.unlink(authProvider)
    id: unlink
    generator: true
    description: Unlinks a provider from a user account.
    arguments:
      - name: authProvider
        required: true
        type: A [firebase.auth.AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) object.
        description: The authentication provider to use for the request.
    output: A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User) instance.
    example: |
      ```javascript
        const authProvider = new firebase.auth.GoogleAuthProvider();

        function* unlinkSaga() {
          try {
            const data = yield call(rsf.auth.unlink, authProvider);
            yield put(unlinkSuccess(data));
          }
          catch(error) {
            yield put(unlinkFailure(error));
          }
        }
      ```
  - signature: auth.updateEmail(email)
    id: updateEmail
    generator: true
    description: Updates the user's email.
    arguments:
      - name: email
        required: true
        type: String
        description: The user's email.
    example: |
      ```javascript
      function* updateEmailSaga(email) {
        try {
          yield call(rsf.auth.updateEmail, email);
          yield put(updateEmail());
        }
        catch(error) {
          yield put(updateEmailFailure(error));
        }
      }
      ```
  - signature: auth.updatePassword(password)
    id: updatePassword
    generator: true
    description: Updates the user's password.
    arguments:
      - name: password
        required: true
        type: String
        description: The user's password.
    example: |
      ```javascript
      function* updatePasswordSaga(password) {
        try {
          yield call(rsf.auth.updatePassword, password);
          yield put(updatePasswordSuccess());
        }
        catch(error) {
          yield put(updatePasswordFailure(error));
        }
      }
      ```
---
