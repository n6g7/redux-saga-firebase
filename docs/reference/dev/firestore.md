---
title: Firestore
layout: docs
methods:

  - signature: firestore.addDocument(collectionRef, data)
    id: addDocument
    generator: true
    description: Adds a new document to this collection with the specified data, assigning it a document ID automatically.
    arguments:
      - name: collectionRef
        required: true
        type: String or [firebase.firestore.CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference)
        description: If using a string, it is a slash-separated path to a collection.
      - name: data
        required: true
        type: Object
        description: The data to store.
    output: A [DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference)
    example: |
      ```js
      function* addDocument() {
        const doc = yield call(
          rsf.firestore.addDocument,
          'users',
          {
            firstName: 'Elon',
            lastName: 'Musk'
          }
        );
      }
      ```

  - signature: firestore.channel(pathOrRef, type, buffer)
    id: channel
    generator: false
    description: Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every time the data at `pathOrRef` in firestore changes.
    arguments:
      - name: pathOrRef
        required: true
        type: String, [firebase.firestore.CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference), [firebase.firestore.DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference) or [firebase.firestore.Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query)
        description: To [filter](https://firebase.google.com/docs/firestore/query-data/get-data), [order or limit](https://firebase.google.com/docs/firestore/query-data/order-limit-data) data, pass a [firebase.firestore.Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query) (eg. `rsf.firestore.channel(colRef.where("capital", "==", true))`). If using a string, it is a slash-separated path to a document or a collection (unfiltered).
      - name: type
        required: false
        type: A string
        description: Either `collection` or `document`. Defaults to `collection`.
      - name: buffer
        required: false
        type: A [Buffer](https://redux-saga.js.org/docs/api/#buffer) object
        description: Defaults to `buffers.none()`. Optional Buffer object to buffer messages on this channel. If not provided, messages will not buffered on this channel. See [redux-saga documentation](https://redux-saga.js.org/docs/api/#buffers) for more information for what options are available.
      - name: snapshotListenOptions
        required: false
        type: [SnapshotListenOptions](https://firebase.google.com/docs/reference/js/firebase.firestore.SnapshotListenOptions)
        description: Options to control the circumstances when the channel will emit events.
    output: A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every time the data at `pathOrRef` in firestore changes.
    example: |
      ```js
      function* syncTodosSaga() {
        const channel = rsf.firestore.channel('todos');

        while(true) {
          const todos = yield take(channel);
          yield put(syncTodos(todos));
        }
      }
      ```

  - signature: firestore.deleteDocument(documentRef)
    id: deleteDocument
    generator: true
    description: Deletes the document referred to by this DocumentReference.
    arguments:
      - name: documentRef
        required: true
        type: String or [firebase.firestore.DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference).
        description: If using a string, it is a slash-separated path to a document.
    example: |
      ```js
      function* deleteDocument() {
        yield call(rsf.firestore.deleteDocument, 'users/elonm');
      }
      ```

  - signature: firestore.getCollection(collectionRef)
    id: getCollection
    generator: true
    description: Reads the collection referred to by this collectionRef.
    arguments:
      - name: collectionRef
        required: true
        type: String or [firebase.firestore.CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference) or [firebase.firestore.Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query)
        description: To [filter](https://firebase.google.com/docs/firestore/query-data/get-data), [order or limit](https://firebase.google.com/docs/firestore/query-data/order-limit-data) data, pass a [Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query) (eg. `yield call(rsf.firestore.getCollection, colRef.where("capital", "==", true))`). If using a string, it is a slash-separated path to a collection (unfiltered).
    output: A [QuerySnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot)
    example: |
      ```js
      function* getCollection() {
        const snapshot = yield call(rsf.firestore.getCollection, 'users');
        let users;
        snapshot.forEach(user => {
            users = {
              ...users,
              [user.id]: user.data()
            }
        });

        yield put(gotUsers(users));
      }
      ```

  - signature: firestore.getDocument(documentRef)
    id: getDocument
    generator: true
    description: Reads the document referred to by this documentRef.
    arguments:
      - name: documentRef
        required: true
        type: String or [firebase.firestore.DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference).
        description: If using a string, it is a slash-separated path to a document.
    output: A [DocumentSnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot)
    example: |
      ```js
      function* getDocument() {
        const snapshot = yield call(rsf.firestore.getDocument, 'users/1');
        const user = snapshot.data();

        yield put(gotUser(user));
      }
      ```

  - signature: firestore.setDocument(documentRef, data, options)
    id: setDocument
    generator: true
    description: Writes to the document referred to by this DocumentReference. If the document does not exist yet, it will be created. If you pass options, the provided data can be merged into the existing document.
    arguments:
      - name: documentRef
        required: true
        type: String or [firebase.firestore.DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference).
        description: If using a string, it is a slash-separated path to a document.
      - name: data
        required: true
        type: Object
        description: An object of the fields and values for the document.
      - name: options
        required: false
        type: Object
        description: "An object to configure the set behavior. Pass `{ merge: true }` to only replace the values specified in the data argument. Fields omitted will remain untouched."
    example: |
      ```js
      function* setDocument() {
        yield call(
          rsf.firestore.setDocument,
          'users/1',
          { firstName: 'Leonardo' }
        );
      }
      ```

  - signature: firestore.syncCollection(pathOrRef, options)
    id: syncCollection
    generator: true
    description: Automatically dispatches a redux action every time the collection at `pathOrRef` changes.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [firebase.firestore.CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference) or [firebase.firestore.Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query)
        description: To [filter](https://firebase.google.com/docs/firestore/query-data/get-data), [order or limit](https://firebase.google.com/docs/firestore/query-data/order-limit-data) data, pass a [Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query) (eg. `yield call(rsf.firestore.syncCollection, colRef.where("capital", "==", true), ...)`). If using a string, it is a slash-separated path to a collection (unfiltered).
      - name: options
        required: true
        type: Object
        description: "An object to configure how the collection should be synchronised. It must contain at least the `successActionCreator` which must take either a [DocumentSnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot) or a [QuerySnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot) as argument. The other possible options are `failureActionCreator` which is called on channel errors, `transform` which is an optional transformer function to be applied to the value before it's passed to the action creator(default to the identity function (`x => x`).) and `snapshotListenOptions` which is an [SnapshotListenOptions](https://firebase.google.com/docs/reference/js/firebase.firestore.SnapshotListenOptions) object to opt into updates when only metadata changes."
    output:
    example: |
      ```js
      import { syncTodos } from '../actionCreators/firestore';

      function* todosRootSaga() {
        yield fork(
          rsf.firestore.syncCollection,
          'todos',
          { successActionCreator: syncTodos }
        );
      }
      ```

  - signature: firestore.syncDocument(pathOrRef, options)
    id: syncDocument
    generator: true
    description: Automatically dispatches a redux action every time the document at `pathOrRef` changes.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [firebase.firestore.DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference)
        description: If using a string, it is a slash-separated path to a document.
      - name: options
        required: true
        type: Object
        description: "An object to configure how the document should be synchronised. It must contain at least the `successActionCreator` which must take either a [DocumentSnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot) or a [QuerySnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot) as argument. The other possible options are `failureActionCreator` which is called on channel errors, `transform` which is an optional transformer function to be applied to the value before it's passed to the action creator(default to the identity function (`x => x`).) and `snapshotListenOptions` which is an [SnapshotListenOptions](https://firebase.google.com/docs/reference/js/firebase.firestore.SnapshotListenOptions) object to opt into updates when only metadata changes."
    output:
    example: |
      ```js
      import { syncTodo } from '../actionCreators/firestore';

      function* todosRootSaga() {
        yield fork(
          rsf.firestore.syncDocument,
          'todos/1',
          { successActionCreator: syncTodo }
        );
      }
      ```

  - signature: firestore.updateDocument(documentRef, ...args)
    id: updateDocument
    generator: true
    description: Updates fields in the document referred to by this DocumentReference. The update will fail if applied to a document that does not exist.
    arguments:
      - name: documentRef
        required: true
        type: String or [firebase.firestore.DocumentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference)
        description: If using a string, it is a slash-separated path to a document.
      - name: args
        required: true
        type: Object
        description: Either an object containing all of the fields and values to update, or a series of arguments alternating between fields (as string or firebase.firestore.FieldPath objects) and values.
    example: |
      ```js
      function* updateDocument() {
        yield call(rsf.firestore.updateDocument, 'users/1', 'lastName', 'Da Vinci');
      }
      ```

---

When using firestore don't forget to install and load the `@firebase/firestore` dependency into your project (as it's not part of the `firebase` package yet):

- install the firestore package: `yarn add @firebase/firestore`
- import it in your project:
  ```js
  import firebase from 'firebase'
  import '@firebase/firestore' // 👈 Don't forget this!
  import ReduxSagaFirebase from 'redux-saga-firebase'

  const firebaseApp = firebase.initializeApp({ ... })

  const rsf = new ReduxSagaFirebase(firebaseApp)

  export default rsf
  ```
