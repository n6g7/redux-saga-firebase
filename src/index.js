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
      createUserWithEmailAndPassword: auth.createUserWithEmailAndPassword.bind(this),
      sendEmailVerification: auth.sendEmailVerification.bind(this),
      sendPasswordResetEmail: auth.sendPasswordResetEmail.bind(this),
      signInAndRetrieveDataWithCredential: auth.signInAndRetrieveDataWithCredential.bind(this),
      signInAnonymously: auth.signInAnonymously.bind(this),
      signInWithCredential: auth.signInWithCredential.bind(this),
      signInWithCustomToken: auth.signInWithCustomToken.bind(this),
      signInWithEmailAndPassword: auth.signInWithEmailAndPassword.bind(this),
      signInWithPopup: auth.signInWithPopup.bind(this),
      signInWithPhoneNumber: auth.signInWithPhoneNumber.bind(this),
      signInWithRedirect: auth.signInWithRedirect.bind(this),
      signOut: auth.signOut.bind(this),
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
      documentAdd: firestore.documentAdd.bind(this),
      documentEmptyAdd: firestore.documentEmptyAdd.bind(this),
      documentSet: firestore.documentSet.bind(this),
      documentUpdate: firestore.documentUpdate.bind(this),
      documentGet: firestore.documentGet.bind(this),
      documentAllGet: firestore.documentAllGet.bind(this),
      documentFilterGet: firestore.documentFilterGet.bind(this),
      documentDelete: firestore.documentDelete.bind(this),
      documentFieldsDelete: firestore.documentFieldsDelete.bind(this),
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
  _getCollection (pathOrRef, service) {
    return (typeof pathOrRef === 'string')
      ? this.app[service]().collection(pathOrRef)
      : pathOrRef
  }
  _getCollectionDocument (collectionRef, documentRef, service) {
    return (typeof collectionRef === 'string' && typeof documentRef === 'string')
      ? this.app[service]().collection(collectionRef).doc(documentRef)
      : collectionRef
  }
  /**
   * 
   * @param {Array} branches @desc Recursively access collection,document,collection,document...sub-collections
   * @param {String} service 
   */
  _getBranch (branches, service) {
    let destination = this.app[service]()
    branches.forEach(branch=> {
      let key = Object.keys(branch)[0]
      let value = branch[key]
      destination.key(value)
    })
    console.log(destination)
    return destination
  }
}

export default ReduxSagaFirebase
