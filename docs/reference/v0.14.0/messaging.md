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

  - signature: messaging.syncMessages(options)
    id: syncMessages
    generator: true
    description: Automatically dispatches a redux action every time a new message is received.
    arguments:
      - name: options
        required: true
        type: Object
        description: "An object to configure how the messages should be synchronised. It must contain at least the `successActionCreator` which must take a new message as a single argument. The other possible options are `failureActionCreator` which is called on channel errors and `transform` which is an optional transformer function to be applied to the value before it's passed to the action creator. Default to the identity function (`x => x`)."
    output:
    example: |
      ```js
      import { showMessage } from '../actionCreators/messaging';

      function* notificationsRootSaga() {
        yield fork(
          rsf.messaging.syncMessages,
          { successActionCreator: showMessage }
        );
      }
      ```

  - signature: messaging.syncToken(options)
    id: syncToken
    generator: true
    description: Automatically dispatches a redux action every time a new registration token is received.
    arguments:
      - name: options
        required: true
        type: Object
        description: "An object to configure how the token should be synchronised. It must contain at least the `successActionCreator` which must take a single argument being the new registration token. The other possible options are `failureActionCreator` which is called on channel errors and `transform` which is an optional transformer function to be applied to the value before it's passed to the action creator. Default to the identity function (`x => x`)."
    output:
    example: |
      ```js
      import { setToken } from '../actionCreators/messaging';

      function* notificationsRootSaga() {
        yield fork(
          rsf.messaging.syncToken,
          { successActionCreator: setToken }
        );
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
