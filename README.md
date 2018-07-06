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
import firebase from 'firebase';
import '@firebase/firestore'; // 👈 If you're using firestore
import ReduxSagaFirebase from 'redux-saga-firebase';

const myFirebaseApp = firebase.initializeApp({
  apiKey: 'qosjdqsdkqpdqldkqdkfojqjpfk',
  authDomain: 'my-app.firebaseapp.com',
  databaseURL: 'https://my-app.firebaseio.com',
});

const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
```

You can now use `reduxSagaFirebase` methods in your sagas:

```js
function* syncSaga() {
  yield fork(reduxSagaFirebase.database.sync, 'todos', {
    successActionCreator: syncTodos,
  });
}
```

Make sure your client provides a implementation of [`fetch`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), either natively or via a polyfill ([`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch) is a pretty good one).

## API

### Authentication

- [`*auth.applyActionCode(code)`](https://redux-saga-firebase.js.org/reference/auth#applyActionCode)
- [`auth.channel()`](https://redux-saga-firebase.js.org/reference/auth#channel)
- [`*auth.confirmPasswordReset(code, newPassword)`](https://redux-saga-firebase.js.org/reference/auth#confirmPasswordReset)
- [`*auth.createUserWithEmailAndPassword(email, password)`](https://redux-saga-firebase.js.org/reference/auth#createUserWithEmailAndPassword)
- [`*auth.linkWithPopup(authProvider)`](https://redux-saga-firebase.js.org/reference/auth#linkWithPopup)
- [`*auth.linkWithRedirect(authProvider)`](https://redux-saga-firebase.js.org/reference/auth#linkWithRedirect)
- [`*auth.sendEmailVerification(actionCodeSettings)`](https://redux-saga-firebase.js.org/reference/auth#sendEmailVerification)
- [`*auth.sendPasswordResetEmail(email, actionCodeSettings)`](https://redux-saga-firebase.js.org/reference/auth#sendPasswordResetEmail)
- [`*auth.signInAndRetrieveDataWithCredential(credential)`](https://redux-saga-firebase.js.org/reference/auth#signInAndRetrieveDataWithCredential)
- [`*auth.signInAnonymously()`](https://redux-saga-firebase.js.org/reference/auth#signInAnonymously)
- [`*auth.signInWithCredential(credential)`](https://redux-saga-firebase.js.org/reference/auth#signInWithCredential)
- [`*auth.signInWithCustomToken(token)`](https://redux-saga-firebase.js.org/reference/auth#signInWithCustomToken)
- [`*auth.signInWithEmailAndPassword(email, password)`](https://redux-saga-firebase.js.org/reference/auth#signInWithEmailAndPassword)
- [`*auth.signInWithPhoneNumber(phoneNumber, applicationVerifier)`](https://redux-saga-firebase.js.org/reference/auth#signInWithPhoneNumber)
- [`*auth.signInWithPopup(authProvider)`](https://redux-saga-firebase.js.org/reference/auth#signInWithPopup)
- [`*auth.signInWithRedirect(authProvider)`](https://redux-saga-firebase.js.org/reference/auth#signInWithRedirect)
- [`*auth.signOut()`](https://redux-saga-firebase.js.org/reference/auth#signOut)
- [`*auth.unlink(authProvider)`](https://redux-saga-firebase.js.org/reference/auth#unlink)
- [`*auth.updateEmail(email)`](https://redux-saga-firebase.js.org/reference/auth#updateEmail)
- [`*auth.updatePassword(password)`](https://redux-saga-firebase.js.org/reference/auth#updatePassword)
- [`*auth.updateProfile(profile)`](https://redux-saga-firebase.js.org/reference/auth#deleteProfile)
- [`*auth.deleteProfile()`](https://redux-saga-firebase.js.org/reference/auth#deleteProfile)

### Database

- [`*database.read(path)`](https://redux-saga-firebase.js.org/reference/database#read)
- [`*database.create(path, data)`](https://redux-saga-firebase.js.org/reference/database#create)
- [`*database.update(path, data)`](https://redux-saga-firebase.js.org/reference/database#update)
- [`*database.patch(path, data)`](https://redux-saga-firebase.js.org/reference/database#patch)
- [`*database.delete(path)`](https://redux-saga-firebase.js.org/reference/database#delete)
- [`database.channel(path, event, buffer)`](https://redux-saga-firebase.js.org/reference/database#channel)
- [`*database.sync(path, options, event)`](https://redux-saga-firebase.js.org/reference/database#sync)

### Firestore

- [`*firestore.addDocument(collectionRef, data)`](https://redux-saga-firebase.js.org/reference/firestore#addDocument)
- [`firestore.channel(pathOrRef, type, buffer)`](https://redux-saga-firebase.js.org/reference/firestore#channel)
- [`*firestore.deleteDocument(documentRef)`](https://redux-saga-firebase.js.org/reference/firestore#deleteDocument)
- [`*firestore.getCollection(collectionRef)`](https://redux-saga-firebase.js.org/reference/firestore#getCollection)
- [`*firestore.getDocument(docRef)`](https://redux-saga-firebase.js.org/reference/firestore#getDocument)
- [`*firestore.setDocument(docRef, data, options)`](https://redux-saga-firebase.js.org/reference/firestore#setDocument)
- [`*firestore.syncCollection(pathOrRef, options)`](https://redux-saga-firebase.js.org/reference/firestore#syncCollection)
- [`*firestore.syncDocument(pathOrRef, options)`](https://redux-saga-firebase.js.org/reference/firestore#syncDocument)
- [`*firestore.updateDocument(docRef, ...args)`](https://redux-saga-firebase.js.org/reference/firestore#updateDocument)

### Functions

- [`*functions.call(functionName, queryParams={}, init={})`](https://redux-saga-firebase.js.org/reference/functions#call)

### Messaging

- [`messaging.channel()`](https://redux-saga-firebase.js.org/reference/messaging#channel)
- [`*messaging.syncMessages(options)`](https://redux-saga-firebase.js.org/reference/messaging#syncMessages)
- [`*messaging.syncToken(options)`](https://redux-saga-firebase.js.org/reference/messaging#syncToken)
- [`messaging.tokenRefreshChannel()`](https://redux-saga-firebase.js.org/reference/messaging#tokenRefreshChannel)

### Storage

- [`storage.uploadFile(path, file, metadata)`](https://redux-saga-firebase.js.org/reference/storage#uploadFile)
- [`storage.uploadString(path, string, format, metadata)`](https://redux-saga-firebase.js.org/reference/storage#uploadString)
- [`*storage.getDownloadURL(path)`](https://redux-saga-firebase.js.org/reference/storage#getDownloadURL)
- [`*storage.getFileMetadata(path)`](https://redux-saga-firebase.js.org/reference/storage#getFileMetadata)
- [`*storage.updateFileMetadata(path, newMetadata)`](https://redux-saga-firebase.js.org/reference/storage#updateFileMetadata)
- [`*storage.deleteFile(path)`](https://redux-saga-firebase.js.org/reference/storage#deleteFile)
