import auth from './auth'
import database from './database'
import functions from './functions'
import messaging from './messaging'
import storage from './storage'

class ReduxSagaFirebase {
  constructor(firebaseApp) {
    this.app = firebaseApp
    this.region = 'us-central1'

    // Authentication methods
    this.signInAnonymously = auth.signInAnonymously.bind(this)
    this.signInWithPopup = auth.signInWithPopup.bind(this)
    this.signInWithEmail = auth.signInWithEmail.bind(this)
    this.logout = auth.logout.bind(this)
    this.authChannel = auth.authChannel.bind(this)

    // Database methods
    this.get = database.get.bind(this)
    this.create = database.create.bind(this)
    this.update = database.update.bind(this)
    this.patch = database.patch.bind(this)
    this.delete = database.delete.bind(this)
    this.channel = database.channel.bind(this)

    // Functions methods
    this.call = functions.call.bind(this)

    // Messaging methods
    this.messageChannel = messaging.messageChannel.bind(this)
    this.tokenRefreshChannel = messaging.tokenRefreshChannel.bind(this)

    // Storage methods
    this.upload = storage.upload.bind(this)
    this.uploadString = storage.uploadString.bind(this)
    this.getDownloadURL = storage.getDownloadURL.bind(this)
    this.getFileMetadata = storage.getFileMetadata.bind(this)
    this.updateFileMetadata = storage.updateFileMetadata.bind(this)
    this.deleteFile = storage.deleteFile.bind(this)
  }

  projectId() {
    if (this._projectId) return this._projectId

    const regex = /^([a-z0-9-]+?)(?:-[a-z0-9]{5})?\.firebaseapp\.com$/
    const projectId = this.app.options.authDomain.match(regex)[1]

    this._projectId = projectId

    return projectId
  }
}

export default ReduxSagaFirebase
