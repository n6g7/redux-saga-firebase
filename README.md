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
    const data = yield call(reduxSagaFirebase.signInWithPopup, authProvider);
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

Make sure your client provides a implementation of [`fetch`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), either natively or via a polyfill ([`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch) is a pretty good one).

## API

- [`new ReduxSagaFirebase(firebaseApp)`](#new-reduxsagafirebasefirebaseapp)
- [`*reduxSagaFirebase.signInAnonymously()`](#reduxsagafirebasesigninanonymously)
- [`*reduxSagaFirebase.signInWithEmailAndPassword(email, password)`](#reduxsagafirebasesigninwithEmailAndPassword)
- [`*reduxSagaFirebase.signInWithPopup(authProvider)`](#reduxsagafirebasesigninwithpopupauthprovider)
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
- [`reduxSagaFirebase.upload(path, file, metadata)`](#reduxsagafirebaseuploadpath-file-metadata)
- [`reduxSagaFirebase.uploadString(path, string, format, metadata)`](#reduxsagafirebaseuploadstringpath-string-format-metadata)
- [`*reduxSagaFirebase.getDownloadURL(path)`](#reduxsagafirebasegetdownloadurlpath)
- [`*reduxSagaFirebase.getFileMetadata(path)`](#reduxsagafirebasegetfilemetadatapath)
- [`*reduxSagaFirebase.updateFileMetadata(path, newMetadata)`](#reduxsagafirebaseupdatefilemetadatapath-newmetadata)
- [`*reduxSagaFirebase.deleteFile(path)`](#reduxsagafirebasedeletefilepath)

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

### `*reduxSagaFirebase.signInAnonymously()`

Starts the login process as an anonymous user. *(generator)*

#### Arguments

*none*

#### Output

A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User.html) instance.

#### Example

```js
function* loginSaga() {
  try {
    const data = yield call(rsf.signInAnonymously, authProvider);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}
```

### `*reduxSagaFirebase.signInWithEmailAndPassword(email, password)`

Starts the login process using an email address and password. *(generator)*

#### Arguments

- `email`: a string
- `password`: a string

#### Output

A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User) instance.

#### Example

```js

function* loginSaga(email, password) {
  try {
    const data = yield call(rsf.signInWithEmailAndPassword, email, password);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}
```

### `*reduxSagaFirebase.signInWithPopup(authProvider)`

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
    const data = yield call(rsf.signInWithPopup, authProvider);
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

### `reduxSagaFirebase.upload(path, file, metadata)`

Uploads a file to cloud storage.

#### Arguments

- `path`: a string representing the path of the file in the bucket.
- `file`: a [`Blob`](https://developer.mozilla.org/en/docs/Web/API/Blob), a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) or an [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) to upload at the specified `path`.
- `metadata` (optional): an [UploadMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata) object.

#### Output

An [UploadTask](https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask) object.

#### Example

```js
function* uploadFile(action) {
  const task = yield call(rsf.upload, action.path, action.file);

  const channel = eventChannel(emit => task.on('state_changed', emit));

  yield takeEvery(channel, ...);

  // Wait for upload to complete
  yield task

  // Do something on complete
}
```

### `reduxSagaFirebase.uploadString(path, string, format, metadata)`

Use this to upload a raw, `base64`, `base64url`, or `data_url` encoded string to Cloud Storage.

#### Arguments

- `path`: a string representing the path of the file in the bucket.
- `string`: a string to upload.
- `format` (optional): a string. Available options are: `base64`, `base64url`, or `data_url`.
- `metadata` (optional): an [UploadMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata) object.

#### Output

An [UploadTask](https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask) object.

#### Example

```js
function* uploadString(action) {
  const task = yield call(rsf.uploadString, action.path, action.fileData, 'base64');

  const channel = eventChannel(emit => task.on('state_changed', emit));

  yield takeEvery(channel, ...);

  // Wait for upload to complete
  yield task

  // Do something on complete
}
```

### `*reduxSagaFirebase.getDownloadURL(path)`

Returns a download url for the file at the specified path.

#### Arguments

- `path`: a string representing the path of the file in the bucket.

#### Output

A url as a string.

#### Example

```js
function* downloadFile(action) {
  const url = yield call(rsf.getDownloadURL, action.path);

  yield call(fetch, url, ...);
}
```

### `*reduxSagaFirebase.getFileMetadata(path)`

#### Arguments

- `path`: a string representing the path of the file in the bucket.

#### Output

A [FullMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.FullMetadata) object.

#### Example

```js
function* metadata(action) {
  const metadata = yield call(rsf.getFileMetadata, action.path);
  return metadata;
}
```

### `*reduxSagaFirebase.updateFileMetadata(path, newMetadata)`

Updates the metadata for a file.

#### Arguments

- `path`: a string representing the path of the file in the bucket.
- `newMetadata`: an object with keys from the [SettableMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.SettableMetadata) interface.

#### Output

A [FullMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.FullMetadata) object.

#### Example

```js
function* setToPng(action) {
  const metadata = yield call(rsf.updateFileMetadata, action.path, {
    contentType: 'image/png'
  });
  return metadata;
}
```

### `*reduxSagaFirebase.deleteFile(path)`

Deletes a file.

#### Arguments

- `path`: a string representing the path of the file in the bucket.

#### Output

*none*

#### Example

```js
function* deleteFile(action) {
  yield call(rsf.deleteFile, action.path);
}
```

## Todo

- [X] Authentication integration
- [X] Real-time database integration
- [X] Functions integration
- [X] Messaging integration
- [X] Storage integration
