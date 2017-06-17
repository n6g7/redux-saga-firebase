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
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the destination.
      - name: data
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
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to update.
      - name: data
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
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to update.
      - name: data
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
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to delete.
    output:
    example: |
      ```js
      function* deleteTodo() {
        yield call(rsf.database.delete, 'todos/-Kfn7EyLEoHax0YGoQr0');
      }
      ```

  - signature: database.channel(pathOrRef, event)
    id: channel
    generator: false
    description: Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every change at the specified path in the database.
    arguments:
      - name: pathOrRef
        type: String or [Firebase Database Reference](https://firebase.google.com/docs/reference/js/firebase.database.Reference)
        description: The path or reference to the value to read.
      - name: event
        type: String
        description: Defaults to `value`. A string describing the type of event to listen for. Options includes `value`, `child_added`, `child_removed`, `child_changed` and `child_moved`. See [Reference.on](https://firebase.google.com/docs/reference/js/firebase.database.Reference#on) documentation for more information.
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
---
