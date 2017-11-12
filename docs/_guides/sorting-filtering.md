---
title: Sorting and filtering
layout: guide
---

## Using firestore

Most of the functions accepting a [firebase.firestore.CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference) argument also accept a [firebase.firestore.Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query) argument.

This means that it is possible to call these methods with filtered queries instead of "full" collection references:

```js
// Will synchronise ALL users:
yield fork(rsf.firestore.sync, 'users', action)
```

can become:

```js
// Will only synchronise users for which the `isAdmin` key is `true`:
yield fork(
  rsf.firestore.sync,
  firestore.collection('users').where('isAdmin', '==', true),
  action
)
```

Similarly it is possible to order and limit queries:

```js
// Get the 10 youngest users:
const users = yield call(
  rsf.firestore.get,
  firestore.collection('users').orderBy('age').limit(10)
)
```
