---
title: Messaging
layout: docs
methods:

  - signature: messaging.channel()
    id: channel
    generator: false
    description: Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits for every message received.
    arguments:
    output: A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits for every message received.
    example: |
      ```js
      function* readMessages() {
        const channel = rsf.messaging.channel();

        while(true) {
          const message = yield take(channel);
          yield put(showMessage(message));
        }
      }
      ```

  - signature: messaging.tokenRefreshChannel()
    id: channel
    generator: false
    description: Returns a redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every time the registration token is refreshed.
    arguments:
    output: A redux-saga [Channel](https://redux-saga.github.io/redux-saga/docs/advanced/Channels.html) which emits every time the registration token is refreshed.
    example: |
      ```js
      function* refreshToken() {
        const channel = rsf.messaging.tokenRefreshChannel();

        while(true) {
          const token = yield take(channel);
          yield put(setToken(token));
        }
      }
      ```
---
