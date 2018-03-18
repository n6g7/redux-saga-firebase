---
title: Using with Immutable.js
layout: guide
---

Firebase's js SDK returns class instances instead of object literals in many cases.
For example [`onAuthStateChanged`](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged) returns a [`firebase.User`](https://firebase.google.com/docs/reference/js/firebase.User) instance and not an object literal.

When using [Immutable.js](https://facebook.github.io/immutable-js/), you won't be able to save those instances directly in the redux store because Immutable doesn't know how to serialize them.
To solve you'll need to serialize them using firebase's API (eg. [`firebase.User.toJSON()`](https://firebase.google.com/docs/reference/js/firebase.User#toJSON)).

```js
function syncUserSaga * () {
  const channel = yield call(rsf.auth.channel);

  while(true) {
    const { error, user } = yield take(channel);

    if (user) yield put(syncUser(
      user.toJSON()  // 👈 manual serialization happens here
    ));
    else yield put(syncError(error));
  }
}
```

For more details, checkout [issue#78](https://github.com/n6g7/redux-saga-firebase/issues/78).
