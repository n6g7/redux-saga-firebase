---
title: Firestore
layout: docs
methods:

  - signature: firestore.getCollection(collectionRef)
    id: getCollection
    generator: true
    description: Reads the collection referred to by this docRef.
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

  - signature: firestore.getDocument(collectionRef, docRef)
    id: getDocument
    generator: true
    description: Reads the document referred to by this docRef.
    arguments:
      - name: collectionRef
        required: true
        type: String or [Firebase CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference)
      - name: docRef
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
