# redux-saga-firebase

[![CircleCI](https://circleci.com/gh/n6g7/redux-saga-firebase.svg?style=svg)](https://circleci.com/gh/n6g7/redux-saga-firebase)
[![npm version](https://badge.fury.io/js/redux-saga-firebase.svg)](https://badge.fury.io/js/redux-saga-firebase)
[![Coverage Status](https://coveralls.io/repos/github/n6g7/redux-saga-firebase/badge.svg?branch=master)](https://coveralls.io/github/n6g7/redux-saga-firebase?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/n6g7/redux-saga-firebase/badge.svg)](https://snyk.io/test/github/n6g7/redux-saga-firebase)

A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase](https://firebase.google.com/).

- Try out the [example app](https://redux-saga-firebase.firebaseapp.com/) and browse its [code](https://github.com/n6g7/redux-saga-firebase/blob/master/example/).
- It also works with React Native 📱! Here's a very simple example: https://github.com/n6g7/cat/tree/master/rn.
- Browse the docs at [https://redux-saga-firebase.js.org/](https://redux-saga-firebase.js.org/).

## Quick start

Install with:

```js
yarn add redux-saga-firebase
```

Initialize a firebase app and instantiate redux-saga-firebase:

```js
import firebase from 'firebase'
import '@firebase/firestore' // 👈 If you're using firestore
import ReduxSagaFirebase from 'redux-saga-firebase'

const myFirebaseApp = firebase.initializeApp({
  apiKey: 'qosjdqsdkqpdqldkqdkfojqjpfk',
  authDomain: 'my-app.firebaseapp.com',
  databaseURL: 'https://my-app.firebaseio.com',
})

const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)
```

You can now use `reduxSagaFirebase` methods in your sagas:

```js
function* syncSaga() {
  yield fork(reduxSagaFirebase.database.sync, 'todos', {
    successActionCreator: syncTodos,
  })
}
```

Make sure your client provides a implementation of [`fetch`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), either natively or via a polyfill ([`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch) is a pretty good one).

## API

### Authentication

- [`*auth.applyActionCode(code)`](https://redux-saga-firebase.js.org/reference/dev/auth#applyActionCode)
- [`auth.channel()`](https://redux-saga-firebase.js.org/reference/dev/auth#channel)
- [`*auth.confirmPasswordReset(code, newPassword)`](https://redux-saga-firebase.js.org/reference/dev/auth#confirmPasswordReset)
- [`*auth.createUserWithEmailAndPassword(email, password)`](https://redux-saga-firebase.js.org/reference/dev/auth#createUserWithEmailAndPassword)
- [`*auth.deleteProfile()`](https://redux-saga-firebase.js.org/reference/dev/auth#deleteProfile)
- [`*auth.linkWithPopup(authProvider)`](https://redux-saga-firebase.js.org/reference/dev/auth#linkWithPopup)
- [`*auth.linkWithRedirect(authProvider)`](https://redux-saga-firebase.js.org/reference/dev/auth#linkWithRedirect)
- [`*auth.sendEmailVerification(actionCodeSettings)`](https://redux-saga-firebase.js.org/reference/dev/auth#sendEmailVerification)
- [`*auth.sendPasswordResetEmail(email, actionCodeSettings)`](https://redux-saga-firebase.js.org/reference/dev/auth#sendPasswordResetEmail)
- [`*auth.signInAndRetrieveDataWithCredential(credential)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInAndRetrieveDataWithCredential)
- [`*auth.signInAnonymously()`](https://redux-saga-firebase.js.org/reference/dev/auth#signInAnonymously)
- [`*auth.signInWithCredential(credential)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInWithCredential)
- [`*auth.signInWithCustomToken(token)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInWithCustomToken)
- [`*auth.signInWithEmailAndPassword(email, password)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInWithEmailAndPassword)
- [`*auth.signInWithPhoneNumber(phoneNumber, applicationVerifier)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInWithPhoneNumber)
- [`*auth.signInWithPopup(authProvider)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInWithPopup)
- [`*auth.signInWithRedirect(authProvider)`](https://redux-saga-firebase.js.org/reference/dev/auth#signInWithRedirect)
- [`*auth.signOut()`](https://redux-saga-firebase.js.org/reference/dev/auth#signOut)
- [`*auth.unlink(authProvider)`](https://redux-saga-firebase.js.org/reference/dev/auth#unlink)
- [`*auth.updateEmail(email)`](https://redux-saga-firebase.js.org/reference/dev/auth#updateEmail)
- [`*auth.updatePassword(password)`](https://redux-saga-firebase.js.org/reference/dev/auth#updatePassword)
- [`*auth.updateProfile(profile)`](https://redux-saga-firebase.js.org/reference/dev/auth#updateProfile)

### Database

- [`*database.read(path)`](https://redux-saga-firebase.js.org/reference/dev/database#read)
- [`*database.create(path, data)`](https://redux-saga-firebase.js.org/reference/dev/database#create)
- [`*database.update(path, data)`](https://redux-saga-firebase.js.org/reference/dev/database#update)
- [`*database.patch(path, data)`](https://redux-saga-firebase.js.org/reference/dev/database#patch)
- [`*database.delete(path)`](https://redux-saga-firebase.js.org/reference/dev/database#delete)
- [`database.channel(path, event, buffer)`](https://redux-saga-firebase.js.org/reference/dev/database#channel)
- [`*database.sync(path, options, event)`](https://redux-saga-firebase.js.org/reference/dev/database#sync)

### Firestore

- [`*firestore.addDocument(collectionRef, data)`](https://redux-saga-firebase.js.org/reference/dev/firestore#addDocument)
- [`firestore.channel(pathOrRef, type, buffer)`](https://redux-saga-firebase.js.org/reference/dev/firestore#channel)
- [`*firestore.deleteDocument(documentRef)`](https://redux-saga-firebase.js.org/reference/dev/firestore#deleteDocument)
- [`*firestore.getCollection(collectionRef)`](https://redux-saga-firebase.js.org/reference/dev/firestore#getCollection)
- [`*firestore.getDocument(docRef)`](https://redux-saga-firebase.js.org/reference/dev/firestore#getDocument)
- [`*firestore.setDocument(docRef, data, options)`](https://redux-saga-firebase.js.org/reference/dev/firestore#setDocument)
- [`*firestore.syncCollection(pathOrRef, options)`](https://redux-saga-firebase.js.org/reference/dev/firestore#syncCollection)
- [`*firestore.syncDocument(pathOrRef, options)`](https://redux-saga-firebase.js.org/reference/dev/firestore#syncDocument)
- [`*firestore.updateDocument(docRef, ...args)`](https://redux-saga-firebase.js.org/reference/dev/firestore#updateDocument)

### Functions

- [`*functions.call(functionName, queryParams={}, init={})`](https://redux-saga-firebase.js.org/reference/dev/functions#call)

### Messaging

- [`messaging.channel()`](https://redux-saga-firebase.js.org/reference/dev/messaging#channel)
- [`*messaging.syncMessages(options)`](https://redux-saga-firebase.js.org/reference/dev/messaging#syncMessages)
- [`*messaging.syncToken(options)`](https://redux-saga-firebase.js.org/reference/dev/messaging#syncToken)
- [`messaging.tokenRefreshChannel()`](https://redux-saga-firebase.js.org/reference/dev/messaging#tokenRefreshChannel)

### Storage

- [`storage.uploadFile(path, file, metadata)`](https://redux-saga-firebase.js.org/reference/dev/storage#uploadFile)
- [`storage.uploadString(path, string, format, metadata)`](https://redux-saga-firebase.js.org/reference/dev/storage#uploadString)
- [`*storage.getDownloadURL(path)`](https://redux-saga-firebase.js.org/reference/dev/storage#getDownloadURL)
- [`*storage.getFileMetadata(path)`](https://redux-saga-firebase.js.org/reference/dev/storage#getFileMetadata)
- [`*storage.updateFileMetadata(path, newMetadata)`](https://redux-saga-firebase.js.org/reference/dev/storage#updateFileMetadata)
- [`*storage.deleteFile(path)`](https://redux-saga-firebase.js.org/reference/dev/storage#deleteFile)

## Contributing

- Clone
- Link lib to example site:
  - `yarn link` in root directory
  - `yarn link redux-saga-firebase` in `example` directory
- Run tests: `yarn test`
