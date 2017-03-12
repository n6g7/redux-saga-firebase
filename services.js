import { eventChannel } from 'redux-saga';
import { config } from './init';

export default {
  login() {
    return config.firebase.auth()
      .signInWithPopup(config.authProvider)
      .then(data => data.credential);
  },
  logout() {
    return config.firebase.auth()
      .signOut();
  },
  getEventChannel() {
    return eventChannel(emitter =>
      config.firebase
        .auth()
        .onAuthStateChanged(
          user => emitter({ user }),
          error => emitter({ error })
        )
    );
  }
}
