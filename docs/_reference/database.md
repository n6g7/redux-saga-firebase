---
title: Database
layout: docs
methods:

  - signature: database.read(pathOrRef)
    id: read
    generator: true
    description: Returns the data at this path in firebase's database.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to read.
    output: Whatever value is store at this path in the database (number, string, object, etc).
    example: |
      ```js
      function* getTodo() {
        const firstTodo = yield call(rsf.database.read, 'todos/1');
        yield put(gotTodo(firstTodo));
      }
      ```

  - signature: database.create(pathOrRef, data)
    id: create
    generator: true
    description: Create a new path in the database and stores the data there.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the destination.
      - name: data
        required: true
        type: Any value
        description: The value to store.
    output: The key newly created (a string).
    example: |
      ```js
      function* addTodo() {
        const key = yield call(rsf.database.create, 'todos', {
          done: false,
          label: 'Do this',
        });
        // `key` is something like "-Kfn7EyLEoHax0YGoQr0"
      }
      ```

  - signature: database.update(pathOrRef, data)
    id: update
    generator: true
    description: Replace the value store at `path` in the database with `data`.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to update.
      - name: data
        required: true
        type: Any value
        description: The value to store.
    output:
    example: |
      ```js
      function* updateTodo() {
        yield call(rsf.database.update, 'todos/-Kfn7EyLEoHax0YGoQr0', {
          done: true, // yay, it's done now!
          label: 'Do this',
        });
      }
      ```

  - signature: database.patch(pathOrRef, data)
    id: patch
    generator: true
    description: Patches the value store at `path` in the database with `data`. Like `database.update` but doesn't remove unmentionned keys.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to update.
      - name: data
        required: true
        type: Any value
        description: The value to store.
    output:
    example: |
      ```js
      function* updateTodo() {
        // With this call, no need to re-send the todo label.
        yield call(rsf.database.patch, 'todos/-Kfn7EyLEoHax0YGoQr0', {
          done: true,
        });
      }
      ```

  - signature: database.delete(pathOrRef)
    id: delete
    generator: true
    description: Removes the value at the specified `path` in the database.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to delete.
    output:
    example: |
      ```js
      function* deleteTodo() {
        yield call(rsf.database.delete, 'todos/-Kfn7EyLEoHax0YGoQr0');
      }
      ```

  - signature: database.channel(pathOrRef, event, buffer)
    id: channel
    generator: false
    description: Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every change at the specified path in the database.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to read.
      - name: event
        required: false
        type: String
        description: Defaults to `value`. A string describing the type of event to listen for. Options includes `value`, `child_added`, `child_removed`, `child_changed` and `child_moved`. See [Reference.on](https://firebase.google.com/docs/reference/js/firebase.database.Reference#on) documentation for more information.
      - name: buffer
        type: [Buffer](https://redux-saga.js.org/docs/api/#buffer)
        description: Defaults to `buffers.none()`. Optional Buffer object to buffer messages on this channel. If not provided, messages will not buffered on this channel. See [redux-saga documentation](https://redux-saga.js.org/docs/api/#buffers) for more information for what options are available.
    output: |
      A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every change at the specified path in the database. The emitted value is an object with two keys:
      - `snapshot`: a [firebase.database.DataSnapshot](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot) ;
      - `value`: the result of `snapshot.val()`, which is the actual value stored in the database (any type).
    example: |
      ```js
      function* syncTodosSaga() {
        const channel = yield call(rsf.database.channel, 'todos');

        while(true) {
          const { value: todos } = yield take(channel);
          yield put(syncTodos(todos));
        }
      }
      ```

  - signature: database.sync(pathOrRef, options, event)
    id: sync
    generator: true
    description: Automatically dispatches a redux action every time `path` changes.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to synced.
      - name: options
        required: true
        type: Object
        description: "An object to configure how the database should be synchronised. It must contain at least the `successActionCreator` which must take a single argument being the value read from the firebase reference. The other possible options are `failureActionCreator` which is called on channel errors and `transform` which is an optional transformer function to be applied to the value before it's passed to the action creator. Default to the identity function (`x => x`)."
      - name: event
        required: false
        type: String
        description: "One of the following strings: `value`, `child_added`, `child_changed`, `child_removed`, or `child_moved`. Defaults to `value`. More details on the [Reference.on doc](https://firebase.google.com/docs/reference/js/firebase.database.Reference#on)."
    output:
    example: |
      ```js
      import { syncTodos } from '../actionCreators/todos';

      function* todoRootSaga() {
        yield fork(
          rsf.database.sync,
          'todos',
          { successActionCreator: syncTodos }
        );
      }
      ```
---
