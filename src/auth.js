import { eventChannel } from 'redux-saga'
import { call } from 'redux-saga/effects'

function* signInAnonymously() {
  const auth = this.app.auth()
  return yield call([auth, auth.signInAnonymously])
}

function* signInWithPopup(authProvider) {
  const auth = this.app.auth()
  const { credential } = yield call([auth, auth.signInWithPopup], authProvider)

  return credential
}

function* signInWithEmail(email, password) {
  const auth = this.app.auth()
  return yield call([auth, auth.signInWithEmailAndPassword], email, password)
}

function* logout() {
  const auth = this.app.auth()
  yield call([auth, auth.signOut])
}

function authChannel() {
  if (this._authChannel) return this._authChannel

  const auth = this.app.auth()
  const channel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    )

    return unsubscribe
  })

  this._authChannel = channel
  return channel
}

export default {
  authChannel,
  signInAnonymously,
  signInWithPopup,
  signInWithEmail,
  logout
}
