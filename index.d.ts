import firebase from 'firebase'
import { Action } from 'redux'
import { Channel } from 'redux-saga'

interface SyncOptions<S, T> {
  successActionCreator: (data: S | T) => Action
  failureActionCreator?: (error: Error) => Action
  transform?: (data: S) => T
}

declare enum FirestoreType {
  Collection = 'collection',
  Document = 'document'
}

declare namespace PathOrRef {
  type Base<R> = string | R
  type Collection = Base<firebase.firestore.CollectionReference>
  type Database = Base<firebase.database.Reference>
  type Document = Base<firebase.firestore.DocumentReference>
  type Storage = Base<firebase.storage.Reference>

  type Firestore = Database | Document
}

declare namespace ChannelOutput {
  namespace Auth {
    interface User {
      user: firebase.User
    }
    interface Error {
      error: firebase.auth.Error
    }
  }

  type Auth = Auth.User | Auth.Error
  type Database = {
    snapshot: firebase.database.DataSnapshot
    value: any
  }
  type Firestore = firebase.firestore.QuerySnapshot | firebase.firestore.DocumentSnapshot

  namespace Messaging {
    type Message = object
    type Token = string
  }
}

interface Auth {
  applyActionCode: (code: string) => void,
  channel: () => Channel<ChannelOutput.Auth>,
  confirmPasswordReset: (code: string, newPassword: string) => void,
  createUserWithEmailAndPassword: (email: string, password: string) => firebase.User,
  deleteProfile: () => void,
  linkWithPopup: (authProvider: firebase.auth.AuthProvider) => firebase.auth.UserCredential,
  linkWithRedirect: (authProvider: firebase.auth.AuthProvider) => void,
  sendEmailVerification: (actionCodeSettings: firebase.auth.ActionCodeSettings) => void,
  sendPasswordResetEmail: (email: string, actionCodeSettings: firebase.auth.ActionCodeSettings) => void,
  signInAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => firebase.auth.UserCredential,
  signInAnonymously: () => firebase.User,
  signInWithCredential: (credential: firebase.auth.AuthCredential) => firebase.User,
  signInWithCustomToken: (token: string) => firebase.User,
  signInWithEmailAndPassword: (email: string, password: string) => firebase.User,
  signInWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => firebase.auth.ConfirmationResult,
  signInWithPopup: (authProvider: firebase.auth.AuthProvider) => firebase.auth.AuthCredential,
  signInWithRedirect: (authProvider: firebase.auth.AuthProvider) => void,
  signOut: () => void,
  unlink: (provider: string) => firebase.User,
  updatePassword: (password: string) => void
}

interface Database {
  read: (pathOrRef: PathOrRef.Database) => any,
  create: (pathOrRef: PathOrRef.Database, data: any) => string,
  update: (pathOrRef: PathOrRef.Database, data: any) => void,
  patch: (pathOrRef: PathOrRef.Database, data: any) => void,
  delete: (pathOrRef: PathOrRef.Database) => void,
  channel: (pathOrRef: PathOrRef.Database, event: string) => Channel<ChannelOutput.Database>,
  sync: (pathOrRef: PathOrRef.Database, options: object, event: string) => void
}

interface Firestore {
  addDocument: (collectionRef: PathOrRef.Collection, data: object) => firebase.firestore.DocumentReference,
  channel: (pathOrRef: PathOrRef.Firestore, type: FirestoreType) => Channel<ChannelOutput.Firestore>,
  deleteDocument: (documentRef: PathOrRef.Document) => void,
  getCollection: (collectionRef: PathOrRef.Collection) => firebase.firestore.QuerySnapshot,
  getDocument: (documentRef: PathOrRef.Document) => firebase.firestore.DocumentSnapshot,
  setDocument: (documentRef: PathOrRef.Document, data: object, options: firebase.firestore.SetOptions) => void,
  syncCollection: <T>(collectionRef: PathOrRef.Collection, options: SyncOptions<ChannelOutput.Firestore, T>) => void,
  syncDocument: <T>(documentRef: PathOrRef.Document, options: SyncOptions<ChannelOutput.Firestore, T>) => void,
  updateDocument: (documentRef: PathOrRef.Document, ...args: any[]) => void
}

interface Functions {
  call: (functionName: string, queryParams: object, init: object) => any
}

interface Messaging {
  channel: () => Channel<ChannelOutput.Messaging.Message>,
  syncMessages: <T>(options: SyncOptions<ChannelOutput.Messaging.Message, T>) => void,
  syncToken: <T>(options: SyncOptions<ChannelOutput.Messaging.Token, T>) => void,
  tokenRefreshChannel: () => Channel<ChannelOutput.Messaging.Token>
}

interface Storage {
  uploadFile: (pathOrRef: PathOrRef.Storage, file, metadata) => firebase.storage.UploadTask,
  uploadString: (pathOrRef: PathOrRef.Storage, string: string, format: firebase.storage.StringFormat, metadata: firebase.storage.UploadMetadata) => firebase.storage.UploadTask,
  getDownloadURL: (pathOrRef: PathOrRef.Storage) => string,
  getFileMetadata: (pathOrRef: PathOrRef.Storage) => firebase.storage.FullMetadata,
  updateFileMetadata: (pathOrRef: PathOrRef.Storage, newMetadata: firebase.storage.SettableMetadata) => firebase.storage.FullMetadata,
  deleteFile: (pathOrRef: PathOrRef.Storage) => void
}

declare class ReduxSagaFirebase {
  app: firebase.app.App
  region: string
  _projectId: string
  _authChannel: Channel<ChannelOutput.Auth>

  auth: Auth
  database: Database
  firestore: Firestore
  functions: Functions
  messaging: Messaging
  storage: Storage

  constructor (firebaseApp: firebase.app.App)

  projectId(): string
}

export default ReduxSagaFirebase
