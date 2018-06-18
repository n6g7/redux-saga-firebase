---
title: Working with multiple apps
layout: guide
---

Initializing multiple firebase apps and using them simultaneously with RSF is really easy.

The first step is to initialize the [firebase.app.App](https://firebase.google.com/docs/reference/js/firebase.app.App) instances themselves. This is well documented [on the firebase docs website](https://firebase.google.com/docs/web/setup#initialize_multiple_apps) (which you should go and read right now if you haven't already 🙂) but here is a summary:

```js
// Initializing the [DEFAULT] app (without a name):
const defaultApp = firebase.initializeApp({
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...'
})

// Initializing named apps:
const otherApp1 = firebase.initializeApp(app1Config, 'other1')
const otherApp2 = firebase.initializeApp(app2Config, 'other2')
```

The default app is accessible directly from the `firebase` object:

- `firebase.database()` is the same as `defaultApp.database()`
- `firebase.auth()` is the same as `defaultApp.auth()`
- etc...

This behavious can get really confusing when using multiple apps so try not to use the `firebase` object and instead use the retuned app (`defaultApp`) in your code. That it's clear which app is being used. :)

Now that we have several app instances, using them with RSF is as easy as calling the `ReduxSagaFirebase` constructor on each of them:

```js
const rsfDefault = new ReduxSagaFirebase(defaultApp)
const rsf1 = new ReduxSagaFirebase(otherApp1)
const rsf2 = new ReduxSagaFirebase(otherApp2)

// And then in your sagas:
function * saga () {
  // 👇Login the user using project1
  const user = yield call(
    rsf1.auth.loginWithPopup,
    provider
  )
  // 👇Save data in project2
  yield call(
    rsf2.firestore. setDocument,
    'collection/document',
    { user }
  )
}
```

See [issue #98](https://github.com/n6g7/redux-saga-firebase/issues/98) for more details.
