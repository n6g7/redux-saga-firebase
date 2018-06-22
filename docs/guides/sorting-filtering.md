---
title: Sorting and filtering
layout: guide
---

## Using the realtime database

All three read methods ([`database.read`](https://redux-saga-firebase.js.org/reference/database#read), [`database.channel`](https://redux-saga-firebase.js.org/reference/database#channel) and [`database.sync`](https://redux-saga-firebase.js.org/reference/database#sync)) accepts references as strings, [`Reference`](https://firebase.google.com/docs/reference/js/firebase.database.Reference) objects or [`Query`](https://firebase.google.com/docs/reference/js/firebase.database.Query) objects.

Using the last two options we can filter, sort and limit the results using the Firebase API methods ([`orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Reference#orderByChild), [`equalTo`](https://firebase.google.com/docs/reference/js/firebase.database.Reference#equalTo), [`limitToLast`](https://firebase.google.com/docs/reference/js/firebase.database.Reference#limitToLast), etc).

### Filtering

```js
// Will only get users for which the `isAdmin` key is `true`:
const admins = yield call(
  rsf.database.read,
  firebase.database().reference('users').orderByChild('isAdmin').equalTo(true)
)
```

### Sorting

```js
// Will get all users ordered by age:
const usersOrderedByAge = yield call(
  rsf.database.read,
  firebase.database().reference('users').orderByChild('age')
)
```

### Limiting

```js
// Will synchronize the five youngest users:
yield fork(
  rsf.database.sync,
  firebase.database().reference('users').orderByChild('age').limitToFirst(5),
  action
)
```

## Using firestore

A similar approch works for firestore methods: [`getCollection`](https://redux-saga-firebase.js.org/reference/firestore#getCollection), [`syncCollection`](https://redux-saga-firebase.js.org/reference/firestore#syncCollection) and [`channel`](https://redux-saga-firebase.js.org/reference/firestore#channel).

They also accept [firebase.firestore.CollectionReference](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference) and [firebase.firestore.Query](https://firebase.google.com/docs/reference/js/firebase.firestore.Query) as argument.

### Filtering

```js
// Will only synchronise users for which the `isAdmin` key is `true`:
yield fork(
  rsf.firestore.syncCollection,
  firestore.collection('users').where('isAdmin', '==', true),
  action
)
```

### Sorting, limiting

```js
// Get the 10 youngest users:
const users = yield call(
  rsf.firestore.getCollection,
  firestore.collection('users').orderBy('age').limit(10)
)
```
