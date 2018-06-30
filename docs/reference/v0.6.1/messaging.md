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

  - signature: messaging.syncMessages(actionCreator)
    id: syncMessages
    generator: true
    description: Automatically dispatches a redux action every time a new message is received.
    arguments:
      - name: actionCreator
        required: true
        type: Function
        description: The action creator to use. It must takes a new message as a single argument.
    output:
    example: |
      ```js
      import { showMessage } from '../actionCreators/messaging';

      function* notificationsRootSaga() {
        yield [
          rsf.messaging.syncMessages(showMessage),
        ];
      }
      ```

  - signature: messaging.syncToken(actionCreator)
    id: syncToken
    generator: true
    description: Automatically dispatches a redux action every time a new registration token is received.
    arguments:
      - name: actionCreator
        required: true
        type: Function
        description: The action creator to use. It must take a single argument being the new registration token.
    output:
    example: |
      ```js
      import { setToken } from '../actionCreators/messaging';

      function* notificationsRootSaga() {
        yield [
          rsf.messaging.syncToken(setToken),
        ];
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
