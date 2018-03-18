---
title: Syncing data
layout: guide
---

Although making synchronisation easy to use is one of the primary goal of this library, there are a few things that are important to understand to avoid common pitfalls.

In this guide we'll implement a data synchronisation saga that supports common scenarios such as:
- starting and stoping the synchronisation process via actions
- handling user login/logout and permissions

We'll iterate over several implementations to get to a complete solution.

<div class="ui info message">
  <p class="header">Sagas <=> processes</p>
  <p>
    As always with redux-saga it's helpful to think of sagas as processes, and to understand the difference between <code>fork</code> and <code>exec</code>.
    If you're not already familiar with these concepts already you should read <a href="https://en.wikipedia.org/wiki/Fork%E2%80%93exec">the wikipedia entry</a> as well as <a href="https://redux-saga.js.org/docs/advanced/ForkModel.html">redux-saga's fork model doc</a> before continuing with this guide.
  </p>
</div>

## Starting point

This is the simplest way to synchronize data:
```js
function * rootSaga () {
  yield fork(
    rsf.database.sync,
    'todos',
    { successActionCreator: setTodos }
  )
}
```

Or, with firestore:
```js
function * rootSaga () {
  yield fork(
    rsf.firestore.syncCollection,
    'todos',
    { successActionCreator: setTodos }
  )
}
```

<div class="ui info message">
  <p class="header">Realtime DB <=> Firestore</p>
  <p>
    We'll use the realtime database for the rest of this guide but the strategies described below work exactly the same using firestore.
  </p>
</div>

<div class="ui warning message">
  <p class="header">Effect creators</p>
  <p>
    If you're not sure why we use <code>yield fork(rsf.database.sync, ...)</code> instead of simply <code>yield rsf.database.sync(...)</code> in the examples above then you should read <a href="https://redux-saga.js.org/docs/basics/DeclarativeEffects.html">redux-saga's docs</a> before continuing with this guide.
  </p>
</div>

In the above, when `rootSaga` starts, it starts an *attached fork* which runs `rsf.database.sync` "in the background".
This means that `rootSaga` isn't blocked by the `yield fork(...)` line and, when it stops, so does `rsf.database.sync`.

Since `rootSaga` is redux-saga's root saga it will never stop and so, in the above example, the synchronization process will never stop.

But what if I need to pause the sync process and restart it later?

## Responding to actions

Now let's assume we have two actions being dispatched by another part of the system (ie. the user pressing buttons): `RESUME_SYNC` and `PAUSE_SYNC`.

First, once we have a sync saga running, how can we take `PAUSE_SYNC` into account to pause the sync process?
Let's list what needs to happen in the root saga:

- start the sync saga
- wait for a `PAUSE_SYNC` action
- stop the sync saga

To implement this we can use [tasks](https://redux-saga.js.org/docs/advanced/TaskCancellation.html).
Task objects represent running sagas and we can use them to stop a saga running the background.

Using the [`take` effect creator](https://redux-saga.js.org/docs/api/#takepattern) to wait for the pause action and the [`cancel` effect creator](https://redux-saga.js.org/docs/api/#canceltask) to cancel the running task we get:

```js
function * rootSaga () {
  // Start the sync saga
  const task = yield fork(
    rsf.database.sync,
    'todos',
    { successActionCreator: setTodos }
  )

  // Wait for the pause action
  yield take('PAUSE_SYNC')

  // Stop the sync saga
  yield cancel(task)
}
```

Now what about restarting?
We need to:

- start the sync saga
- wait for a `PAUSE_SYNC` action
- stop the sync saga
- wait for a `RESUME_SYNC` action
- restart the sync saga

Or, to be able to pause/resume sync as many times as we want:

- infinite loop:
  - start the sync saga
  - wait for a `PAUSE_SYNC` action
  - stop the sync saga
  - wait for a `RESUME_SYNC` action

<div class="ui info message">
  <p class="header">Inifinite loops in saga</p>
  <p>
    Note that it's ok to have an infinite loop here because <code>yield</code> gives back control while waiting so we don't actually use up all CPU cycles. 😉
  </p>
</div>

So we end up with:

```js
function * rootSaga () {
  while (true) {
    // Start the sync saga
    let task = yield fork(
      rsf.database.sync,
      'todos',
      { successActionCreator: setTodos }
    )

    // Wait for the pause action, then stop sync
    yield take('PAUSE_SYNC')
    yield cancel(task)

    // Wait for the resume action
    yield take('RESUME_SYNC')
  }
}
```

That's a perfectly fine saga, but what if we want to sync user-specific data (ie. not always at `todos`)? 🤔

## Syncing user data

Let's now synchronize our user's notifications stored in `notifications/:userId`.

The actions we're going to listen for are slightly different: `LOGIN` and `LOGOUT` instead of `SYNC_RESUME` and `SYNC_PAUSE`, but they essentially serve the same purpose.
We also won't start the sync process automatically when the application starts anymore.

We only need a couple changes to get this to work:
```js
function * rootSaga () {
  while (true) {
    // Wait for a user to login
    const loginAction = yield take('LOGIN')

    // Start the sync saga
    let task = yield fork(
      rsf.database.sync,
      `notifications/${loginAction.userId}`,
      { successActionCreator: syncNotifications }
    )

    // Wait for the logout action, then stop sync
    yield take('LOGOUT')
    yield cancel(task)
  }
}
```

So what changed?
- waiting for `RESUME_SYNC`/`LOGIN` was moved to the start of loop to make sure we don't automatically start syncing when the app starts
- the `sync`ed path (`notifications/${loginAction.userId}`) now depends on the content of the action that's returned by `yield take('LOGIN')`

<div class="ui warning message">
  <p class="header">Permissions in firebase</p>
  <p>
    When configured correctly, firebase won't let any random user read data from <code>notifications/123</code>, only a user logged in with id 123 will be able to read that.
  </p>
  <p>
    So, if you forget to stop the synchronisation saga for <code>notifications/123</code> when user 123 logs out, you'll start seeing permission errors in the console because you're no longer allowed to access this data.
  </p>
  <p>
    <strong>Don't forget to stop background saga when you don't need them anymore!</strong>
  </p>
  <p>
    For more details, check out <a href="https://github.com/n6g7/redux-saga-firebase/issues/92">issue #92</a>.
  </p>
</div>

And that's it!

This should work as expected when users log in and out, however we've kinda been re-inventing the wheel here, let's see how we can refactor this.

## Refactor

Let's start by extracting our code to a separate saga:
```diff
  function * rootSaga () {
+   yield fork(syncSaga)
+   // other stuff
+ }
+
+ function * syncSaga () {
    while (true) {
      // Wait for a user to login
      const loginAction = yield take('LOGIN')

      // Start the sync saga
      let task = yield fork(
        rsf.database.sync,
        `notifications/${loginAction.userId}`,
        { successActionCreator: syncNotifications }
      )

      // Wait for the logout action, then stop sync
      yield take('LOGOUT')
      yield cancel(task)
    }
  }
```

It's a small change but it allows us to start several sagas from `rootSaga` and to move `syncSaga` to another file if necessary.

Then let's rewrite our code using [`takeLatest`](https://redux-saga.js.org/docs/api/#takelatestpattern-saga-args).

Essentially, `takeLatest` starts a saga whenever an action is dispatched, so we could use it to start `syncSaga` whenever `LOGIN` is dispatched and get rid of this distasteful `while(true)` loop:

```js
function * rootSaga () {
  yield takeLatest('LOGIN', syncSaga)
  // other stuff
}

function * syncSaga (action) {
  // Start the sync saga
  let task = yield fork(
    rsf.database.sync,
    `notifications/${action.userId}`,
    { successActionCreator: syncNotifications }
  )

  // Wait for the logout action, then stop sync
  yield take('LOGOUT')
  yield cancel(task)
}
```

No need to wait for `LOGIN` manually anymore, and no need to think about this infinite loop either!

## Conclusion

Learnings:

- `fork`ed sagas run "in the background" and aren't blocking
- [task](https://redux-saga.js.org/docs/api/#task) objects let us start and stop background sagas (ie. data synchronization sagas)
- high level effect creators (`takeEvery`, `takeLatest`) save time and prevent headaches, use them!

For more details, check out [issue #92](https://github.com/n6g7/redux-saga-firebase/issues/92).
