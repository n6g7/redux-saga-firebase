import auth from './auth'
import database from './database'
import firestore from './firestore'
import functions from './functions'
import messaging from './messaging'
import storage from './storage'

class ReduxSagaFirebase {
  constructor (firebaseApp) {
    this.app = firebaseApp
    this.region = 'us-central1'

    // Authentication methods
    this.auth = {
      applyActionCode: auth.applyActionCode.bind(this),
      channel: auth.channel.bind(this),
      confirmPasswordReset: auth.confirmPasswordReset.bind(this),
      createUserWithEmailAndPassword: auth.createUserWithEmailAndPassword.bind(
        this
      ),
      linkWithPopup: auth.linkWithPopup.bind(this),
      linkWithRedirect: auth.linkWithRedirect.bind(this),
      sendEmailVerification: auth.sendEmailVerification.bind(this),
      sendPasswordResetEmail: auth.sendPasswordResetEmail.bind(this),
      signInAndRetrieveDataWithCredential: auth.signInAndRetrieveDataWithCredential.bind(
        this
      ),
      signInAnonymously: auth.signInAnonymously.bind(this),
      signInWithCredential: auth.signInWithCredential.bind(this),
      signInWithCustomToken: auth.signInWithCustomToken.bind(this),
      signInWithEmailAndPassword: auth.signInWithEmailAndPassword.bind(this),
      signInWithPopup: auth.signInWithPopup.bind(this),
      signInWithPhoneNumber: auth.signInWithPhoneNumber.bind(this),
      signInWithRedirect: auth.signInWithRedirect.bind(this),
      signOut: auth.signOut.bind(this),
      unlink: auth.unlink.bind(this),
      updatePassword: auth.updatePassword.bind(this)
    }

    // Database methods
    this.database = {
      read: database.read.bind(this),
      create: database.create.bind(this),
      update: database.update.bind(this),
      patch: database.patch.bind(this),
      delete: database.delete.bind(this),
      channel: database.channel.bind(this),
      sync: database.sync.bind(this)
    }

    // Firestore methods
    this.firestore = {
      addDocument: firestore.addDocument.bind(this),
      channel: firestore.channel.bind(this),
      deleteDocument: firestore.deleteDocument.bind(this),
      getCollection: firestore.getCollection.bind(this),
      getDocument: firestore.getDocument.bind(this),
      setDocument: firestore.setDocument.bind(this),
      syncCollection: firestore.syncCollection.bind(this),
      syncDocument: firestore.syncDocument.bind(this),
      updateDocument: firestore.updateDocument.bind(this)
    }

    // Functions methods
    this.functions = {
      call: functions.call.bind(this)
    }

    // Messaging methods
    this.messaging = {
      channel: messaging.channel.bind(this),
      syncMessages: messaging.syncMessages.bind(this),
      syncToken: messaging.syncToken.bind(this),
      tokenRefreshChannel: messaging.tokenRefreshChannel.bind(this)
    }

    // Storage methods
    this.storage = {
      uploadFile: storage.uploadFile.bind(this),
      uploadString: storage.uploadString.bind(this),
      getDownloadURL: storage.getDownloadURL.bind(this),
      getFileMetadata: storage.getFileMetadata.bind(this),
      updateFileMetadata: storage.updateFileMetadata.bind(this),
      deleteFile: storage.deleteFile.bind(this)
    }
  }

  projectId () {
    if (this._projectId) return this._projectId

    const regex = /^([a-z0-9-]+)\.firebaseapp\.com$/
    const projectId = this.app.options.authDomain.match(regex)[1]

    this._projectId = projectId

    return projectId
  }
}

export default ReduxSagaFirebase
