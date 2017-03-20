# redux-saga-firebase
[![CircleCI](https://circleci.com/gh/n6g7/redux-saga-firebase.svg?style=svg)](https://circleci.com/gh/n6g7/redux-saga-firebase) [![npm version](https://badge.fury.io/js/redux-saga-firebase.svg)](https://badge.fury.io/js/redux-saga-firebase) [![Coverage Status](https://coveralls.io/repos/github/n6g7/redux-saga-firebase/badge.svg?branch=master)](https://coveralls.io/github/n6g7/redux-saga-firebase?branch=master)

A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase](https://firebase.google.com/).

Try out the [example app](https://redux-saga-firebase.firebaseapp.com/) and browse it's [code](https://github.com/n6g7/redux-saga-firebase/blob/master/example/).

## Quick start

Install with:

```js
yarn add redux-saga-firebase
```

Initialize a firebase app and instanciate redux-saga-firebase:

```js
import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const myFirebaseApp = firebase.initializeApp({
  apiKey: "qosjdqsdkqpdqldkqdkfojqjpfk",
  authDomain: "my-app.firebaseapp.com",
  databaseURL: "https://my-app.firebaseio.com",
});

const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)
```

You can now use `reduxSagaFirebase` methods in your sagas:

```js
const authProvider = new firebase.auth.GoogleAuthProvider();

function* loginSaga() {
  try {
    const data = yield call(reduxSagaFirebase.login, authProvider);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}

export default function* rootSaga() {
  yield [
    takeEvery(types.LOGIN.REQUEST, loginSaga);
  ];
}
```

## API

### `new ReduxSagaFirebase(firebaseApp)`

Instanciate `ReduxSagaFirebase`.

#### Arguments

- `firebaseApp`: a [firebase.app.App](https://firebase.google.com/docs/reference/js/firebase.app.App) object.

#### Output

A `ReduxSagaFirebase` instance.

#### Example

```js
const firebaseApp = firebase.initializeApp({
  apiKey: "qdsqdqqsdmqldmqdsmlqùlm",
  authDomain: "my-app.firebaseapp.com",
  databaseURL: "https://my-app.firebaseio.com",
});

const rsf = new ReduxSagaFirebase(firebaseApp);
```

### `*reduxSagaFirebase.login(authProvider)`

Starts the login process using the specified AuthProvider. *(generator)*

#### Arguments

- `authProvider`: a [firebase.auth.AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) object.

#### Output

A [firebase.auth.AuthCredential](https://firebase.google.com/docs/reference/js/firebase.auth.AuthCredential) instance.

#### Example

```js
const authProvider = new firebase.auth.GoogleAuthProvider();

function* loginSaga() {
  try {
    const data = yield call(rsf.login, authProvider);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}
```

### `*reduxSagaFirebase.logout()`

Logs the user out. *(generator)*

#### Arguments

*none*

#### Output

*none*

#### Example

```js
function* logoutSaga() {
  try {
    const data = yield call(rsf.logout);
    yield put(logoutSuccess(data));
  }
  catch(error) {
    yield put(logoutFailure(error));
  }
}
```

### `reduxSagaFirebase.authChannel()`

Gets a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every user change.

#### Arguments

*none*

#### Output

A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits for every user change.

#### Example

```js
function* syncUserSaga() {
  const channel = yield call(rsf.authChannel);

  while(true) {
    const { error, user } = yield take(channel);

    if (user) yield put(syncUser(user));
    else yield put(syncError(error));
  }
}
```

## Todo

- [X] Authentication integration
- [ ] Real-time database integration
