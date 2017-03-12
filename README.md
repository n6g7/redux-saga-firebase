# redux-saga-firebase

A [redux-saga](https://github.com/redux-saga/redux-saga/) integration for [firebase](https://firebase.google.com/).

## Quick start

Install with:

```js
yarn add redux-saga-firebase
```

Configure RSF **before** running your root saga:

```js
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { init } from 'redux-saga-firebase';

firebase.initializeApp({ ... });

const provider = new firebase.auth.FacebookAuthProvider(); // or whatever you want

// Initialize RSF
init(firebase, provider);
```

Attach the RSF saga to your root saga:

```js
import { saga as rsfSaga } from 'redux-saga-firebase';

export default function* rootSaga() {
  yield [
    ...,
    rsfSaga(),
  ];
}
```

Use the `login` and `logout` action creators:

```js
import { login, logout } from 'redux-saga-firebase';

const component = props => (
  <div>
    <button onClick={login}>Login</buton>
    <button onClick={logout}>Logout</buton>
  </div>
)
```

Listen for the following types in your reducers:

| Type            | Action keys | Explanation             |
|-----------------|-------------|-------------------------|
| `LOGIN.REQUEST` | *empty* | The login process has started. |
| `LOGIN.SUCCESS` | `user`: a firebase [User](https://firebase.google.com/docs/reference/js/firebase.User) object. | Authentication was successful. |
| `LOGIN.FAILURE` | `error`: an Error object | Authentication failed. |
| `LOGOUT.REQUEST` | *empty* | The logout process has started. |
| `LOGOUT.SUCCESS` | *empty* | Logout was successful. |
| `LOGOUT.FAILURE` | `error`: an Error object | Logout failed. |
| `SET_CREDENTIAL` | `credential`: an [AuthCredential](https://firebase.google.com/docs/reference/js/firebase.auth.AuthCredential) object | Credential object provided by the auth provider during authentication. |

Those types are defined in:

```js
import { types } from 'redux-saga-firebase';

console.log(types);
/* {
 *   LOGIN: {
 *     REQUEST: '...',
 *     SUCCESS: '...',
 *     FAILURE: '...',
 *   },
 *   LOGOUT: {
 *     REQUEST: '...',
 *     SUCCESS: '...',
 *     FAILURE: '...',
 *   },
 *   SET_CREDENTIAL: '...'
 * }
 */
```

## Todo

- [X] Authentication integration
- [ ] Real-time database integration
