---
title: Custom keys
layout: guide
---

## Firebase push keys

Firebase's [push](https://firebase.google.com/docs/reference/js/firebase.database.Reference#push) method automatically generates a key to save the new child.
For example calling `database.ref('users').push({ name: 'Elon' })` will save create the following structure in the realtime database:

```json
{
  "users": {
    "-L13_r6yHjZJV2V8yTQm": {
      "name": "Elon"
    }
  }
}
```

And `-L13_r6yHjZJV2V8yTQm` (the automatically generated key) will be returned.

You can learn more about those keys (and their cool properties) by reading this firebase blog article: [The 2^120 Ways to Ensure Unique Identifiers](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html) and the [associated gist](https://gist.github.com/mikelehen/3596a30bd69384624c11).
There's also this cool npm package if you want to generate those keys yourself: [firebase-key](https://www.npmjs.com/package/firebase-key).

## Choosing your own keys

Since calling [`push`](https://firebase.google.com/docs/reference/js/firebase.database.Reference#push) (or RSF's [`database.create`](/redux-saga-firebase/reference/database#create)) automatically generates the key, you won't have an option to choose it yourself.

The alternative is to use the [`set`](https://firebase.google.com/docs/reference/js/firebase.database.Reference#set) method (or RSF's [`database.update`](/redux-saga-firebase/reference/database#update)) with the key already built in the reference:

```js
function updateUserSaga * (userId, userData) {
  yield call(
    rsf.database.update,
    `users/${userId}`,
    userData
  )
}
```

See [issue#82](https://github.com/n6g7/redux-saga-firebase/issues/82) for more info.
