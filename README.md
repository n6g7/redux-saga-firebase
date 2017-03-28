# redux-saga-firebase
[![CircleCI](https://circleci.com/gh/n6g7/redux-saga-firebase.svg?style=svg)](https://circleci.com/gh/n6g7/redux-saga-firebase) [![npm version](https://badge.fury.io/js/redux-saga-firebase.svg)](https://badge.fury.io/js/redux-saga-firebase) [![Coverage Status](https://coveralls.io/repos/github/n6g7/redux-saga-firebase/badge.svg?branch=master)](https://coveralls.io/github/n6g7/redux-saga-firebase?branch=master) [![bitHound Overall Score](https://www.bithound.io/github/n6g7/redux-saga-firebase/badges/score.svg)](https://www.bithound.io/github/n6g7/redux-saga-firebase)

A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase](https://firebase.google.com/).

Try out the [example app](https://redux-saga-firebase.firebaseapp.com/) and browse its [code](https://github.com/n6g7/redux-saga-firebase/blob/master/example/).

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

- [`new ReduxSagaFirebase(firebaseApp)`](#new-reduxsagafirebasefirebaseapp)
- [`*reduxSagaFirebase.login(authProvider)`](#reduxsagafirebaseloginauthprovider)
- [`*reduxSagaFirebase.logout()`](#reduxsagafirebaselogout)
- [`reduxSagaFirebase.authChannel()`](#reduxsagafirebaseauthchannel)
- [`*reduxSagaFirebase.get(path)`](#reduxsagafirebasegetpath)
- [`*reduxSagaFirebase.create(path, data)`](#reduxsagafirebasecreatepath-data)
- [`*reduxSagaFirebase.update(path, data)`](#reduxsagafirebaseupdatepath-data)
- [`*reduxSagaFirebase.patch(path, data)`](#reduxsagafirebasepatchpath-data)
- [`*reduxSagaFirebase.delete(path)`](#reduxsagafirebasedeletepath)
- [`reduxSagaFirebase.channel(path, event)`](#reduxsagafirebasechannelpath-event)
- [`*reduxSagaFirebase.call(functionName, parameters={})`](#reduxsagafirebasecallfunctionname-parameters)
- [`reduxSagaFirebase.messageChannel()`](#reduxsagafirebasemessagechannel)
- [`reduxSagaFirebase.tokenRefreshChannel()`](#reduxsagafirebasetokenrefreshchannel)

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

### `*reduxSagaFirebase.get(path)`

Returns the data at this path in firebase's database.

#### Arguments

- `path`: a string

#### Output

Whatever value is store at this path in the database (number, string, object, etc).

#### Example

```js
function* getTodo() {
  const firstTodo = yield call(rsf.get, 'todos/1');
  yield put(gotTodo(firstTodo));
}
```

### `*reduxSagaFirebase.create(path, data)`

Create a new path in the database and stores the data there.

#### Arguments

- `path`: a string
- `data`: any value (number, string, object, etc)

#### Output

The key newly created (a string).

#### Example

```js
function* addTodo() {
  const key = yield call(rsf.create, 'todos', {
    done: false,
    label: 'Do this',
  });
  // `key` is something like "-Kfn7EyLEoHax0YGoQr0"
}
```

### `*reduxSagaFirebase.update(path, data)`

Replace the value store at `path` in the database with `data`.

#### Arguments

- `path`: a string
- `data`: any value (number, string, object, etc)

#### Output

*none*

#### Example

```js
function* updateTodo() {
  yield call(rsf.update, 'todos/-Kfn7EyLEoHax0YGoQr0', {
    done: true, // yay, it's done now!
    label: 'Do this',
  });
}
```

### `*reduxSagaFirebase.patch(path, data)`

Patches the value store at `path` in the database with `data`. Like `reduxSagaFirebase.update` but doesn't remove unmentionned keys.

#### Arguments

- `path`: a string
- `data`: any value (number, string, object, etc)

#### Output

*none*

#### Example

```js
function* updateTodo() {
  // With this call, no need to re-send the todo label.
  yield call(rsf.patch, 'todos/-Kfn7EyLEoHax0YGoQr0', {
    done: true,
  });
}
```

### `*reduxSagaFirebase.delete(path)`

Removes the value at the specified `path` in the database.

#### Arguments

- `path`: a string

#### Output

*none*

#### Example

```js
function* deleteTodo() {
  yield call(rsf.delete, 'todos/-Kfn7EyLEoHax0YGoQr0');
}
```

### `reduxSagaFirebase.channel(path, event)`

Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every change at the specified path in the database.

#### Arguments

- `path`: a string
- `event` (default: `value`): a string describing the type of event to listen for. Options includes: `value`, `child_added`, `child_removed`, `child_changed` and `child_moved`. See [Reference.on](https://firebase.google.com/docs/reference/js/firebase.database.Reference#on) documentation for more information.

#### Output

A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every change at the specified path in the database.

#### Example

```js
function* syncTodosSaga() {
  const channel = yield call(rsf.channel, 'todos');

  while(true) {
    const todos = yield take(channel);
    yield put(syncTodos(todos));
  }
}
```

### `*reduxSagaFirebase.call(functionName, parameters={})`

Calls a [cloud function](https://firebase.google.com/docs/functions/) with the given parameters.
The function has to be triggered by HTTP request.

⚠️ You will need to **enable CORS** in order for this to work.
The easiest way to do so is to use the [cors](https://www.npmjs.com/package/cors) middleware for express.

This assumes that your functions are hosted in the `us-central1` region.
If this is not the case you can change the region used by setting `rsf.region`:

```js
const rsf = new ReduxSagaFirebase(...);
rsf.region = 'other-region1';
```

#### Arguments

- `functionName`: a string representing the function name. This will be used as a pathname in the https request.
- `parameters` (default: `{}`): a javascript object describing the query parameters to use in the http request.

#### Output

A javascript object (`application/json`) or a string (anything else) depending on the Content-Type of the response.

#### Example

```js
function* callFunction() {
  // Will call: https://us-central1-project-id.firebaseapp.com/sayHello?name=Alfred
  const result = yield call(rsf.call, 'sayHello', {
    name: 'Alfred'
  });

  // `result` is either an object or a string (depends on response's Content-Type)
}
```

### `reduxSagaFirebase.messageChannel()`

Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits for every message received.

#### Arguments

*none*

#### Output

A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits for every message received.

#### Example

```js
function* readMessages() {
  const channel = rsf.messageChannel();

  while(true) {
    const message = yield take(channel);
    yield put(showMessage(message));
  }
}
```

### `reduxSagaFirebase.tokenRefreshChannel()`

Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every time the registration token is refreshed.

#### Arguments

*none*

#### Output

A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every time the registration token is refreshed.

#### Example

```js
function* refreshToken() {
  const channel = rsf.tokenRefreshChannel();

  while(true) {
    const token = yield take(channel);
    yield put(setToken(token));
  }
}
```

## Todo

- [X] Authentication integration
- [X] Real-time database integration
- [X] Functions integration
- [X] Messaging integration
- [ ] Storage integration
