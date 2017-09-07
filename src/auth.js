import { eventChannel } from 'redux-saga'
import { call } from 'redux-saga/effects'

function * signInAndRetrieveDataWithCredential (credential) {
  const auth = this.app.auth()
  return yield call([auth, auth.signInAndRetrieveDataWithCredential], credential)
}

function * signInAnonymously () {
  const auth = this.app.auth()
  return yield call([auth, auth.signInAnonymously])
}

function * signInWithCredential (credential) {
  const auth = this.app.auth()
  return yield call([auth, auth.signInWithCredential], credential)
}

function * signInWithCustomToken (token) {
  const auth = this.app.auth()
  return yield call([auth, auth.signInWithCustomToken], token)
}

function * signInWithEmailAndPassword (email, password) {
  const auth = this.app.auth()
  return yield call([auth, auth.signInWithEmailAndPassword], email, password)
}

function * signInWithPhoneNumber (phoneNumber, applicationVerifier) {
  const auth = this.app.auth()
  return yield call(
    [auth, auth.signInWithPhoneNumber],
    phoneNumber,
    applicationVerifier
  )
}

function * signInWithPopup (authProvider) {
  const auth = this.app.auth()
  const { credential } = yield call([auth, auth.signInWithPopup], authProvider)

  return credential
}

function * signInWithRedirect (authProvider) {
  const auth = this.app.auth()
  yield call([auth, auth.signInWithRedirect], authProvider)
}

function * createUserWithEmailAndPassword (email, password) {
  const auth = this.app.auth()
  return yield call([auth, auth.createUserWithEmailAndPassword], email, password)
}

function * applyActionCode (code) {
  const auth = this.app.auth()
  return yield call([auth, auth.applyActionCode], code)
}

function * signOut () {
  const auth = this.app.auth()
  yield call([auth, auth.signOut])
}

function channel () {
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
  channel,
  createUserWithEmailAndPassword,
  signInAndRetrieveDataWithCredential,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  applyActionCode,
  signOut
}
