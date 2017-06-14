import auth from './auth'
import database from './database'
import functions from './functions'
import messaging from './messaging'
import storage from './storage'

class ReduxSagaFirebase {
  constructor (firebaseApp) {
    this.app = firebaseApp
    this.region = 'us-central1'

    // Authentication methods
    this.auth = {
      signInAnonymously: auth.signInAnonymously.bind(this),
      signInWithPopup: auth.signInWithPopup.bind(this),
      signInWithEmailAndPassword: auth.signInWithEmailAndPassword.bind(this),
      signOut: auth.signOut.bind(this),
      channel: auth.channel.bind(this)
    }

    // Database methods
    this.database = {
      read: database.read,
      create: database.create,
      update: database.update,
      patch: database.patch,
      delete: database.delete,
      channel: database.channel
    }

    // Functions methods
    this.functions = {
      call: functions.call.bind(this)
    }

    // Messaging methods
    this.messaging = {
      channel: messaging.channel.bind(this),
      tokenRefreshChannel: messaging.tokenRefreshChannel.bind(this)
    }

    // Storage methods
    this.storage = {
      uploadFile: storage.uploadFile,
      uploadString: storage.uploadString,
      getDownloadURL: storage.getDownloadURL,
      getFileMetadata: storage.getFileMetadata,
      updateFileMetadata: storage.updateFileMetadata,
      deleteFile: storage.deleteFile
    }
  }

  projectId () {
    if (this._projectId) return this._projectId

    const regex = /^([a-z0-9-]+?)(?:-[a-z0-9]{5})?\.firebaseapp\.com$/
    const projectId = this.app.options.authDomain.match(regex)[1]

    this._projectId = projectId

    return projectId
  }

  _getRef (pathOrRef, service) {
    return (typeof pathOrRef === 'string')
      ? this.app[service]().ref(pathOrRef)
      : pathOrRef
  }
}

export default ReduxSagaFirebase
