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
        type: String or [Firebase CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference)
      - name: data
        required: true
        type: An object
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

  - signature: firestore.deleteDocument(collectionRef, documentRef)
    id: deleteDocument
    generator: true
    description: Deletes the document referred to by this DocumentReference.
    arguments:
      - name: collectionRef
        required: true
        type: String or [Firebase CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference)
      - name: documentRef
        required: true
        type: A slash-separated path to a document (string).
    example: |
      ```js
      function* deleteDocument() {
        const doc = yield call(
          rsf.firestore.deleteDocument,
          'users',
          'elonm'
        );
      }
      ```

  - signature: firestore.getCollection(collectionRef)
    id: getCollection
    generator: true
    description: Reads the collection referred to by this collectionRef.
    arguments:
      - name: collectionRef
        required: true
        type: String or [Firebase CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference)
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

  - signature: firestore.getDocument(collectionRef, documentRef)
    id: getDocument
    generator: true
    description: Reads the document referred to by this documentRef.
    arguments:
      - name: collectionRef
        required: true
        type: String or [Firebase CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference)
      - name: documentRef
        required: true
        type: A slash-separated path to a document (string).
    output: A [DocumentSnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot)
    example: |
      ```js
      function* getDocument() {
        const snapshot = yield call(rsf.firestore.getDocument, 'users', '1');
        const user = snapshot.data();

        yield put(gotUser(user));
      }
      ```

---
