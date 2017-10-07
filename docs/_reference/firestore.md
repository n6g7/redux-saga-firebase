---
title: Firestore
layout: docs
methods:

  - signature: firestore.getDoc(collectionRef, docRef)
    id: getDoc
    generator: true
    description: Reads the document referred to by this docRef.
    arguments:
      - name: collectionRef
        required: true
        type: A CollectionReference object.
      - name: docRef
        required: true
        type: A slash-separated path to a document.
    output: Promise containing non-null firebase.firestore.DocumentSnapshot
    example: |
      ```js
      function* getDocument() {
        const snapshot = yield call(rsf.firestore.getDoc, 'users', '1');
        const user = snapshot.data();

        yield put(gotUser(user));
      }
      ```

    - signature: firestore.getCollection(collectionRef)
    id: getDoc
    generator: true
    description: Reads the document referred to by this docRef.
    arguments:
      - name: collectionRef
        required: true
        type: A CollectionReference object.
    output: returns a QuerySnapshot.
    example: |
      ```js
      function* getCollection() {
        const snapshot = yield call(rsf.firestore.getCollection, 'users');
        let users;
        snapshot.forEach(user => {
            users = {...users, [user.id]: user.data()}
        });

        yield put(gotUsers(users));
      }
      ```
---
