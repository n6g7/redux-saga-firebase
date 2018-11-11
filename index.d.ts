import * as firebase from 'firebase'
import { Action } from 'redux'
import { Channel, SagaIterator } from 'redux-saga'

interface SyncOptions<S, T> {
  successActionCreator: (data: S | T) => Action
  failureActionCreator?: (error: Error) => Action
  transform?: (data: S) => T
}

declare enum FirestoreType {
  Collection = 'collection',
  Document = 'document',
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
  applyActionCode: (code: string) => SagaIterator
  channel: () => Channel<ChannelOutput.Auth>
  confirmPasswordReset: (code: string, newPassword: string) => SagaIterator
  createUserWithEmailAndPassword: (email: string, password: string) => firebase.User
  deleteProfile: () => SagaIterator
  linkWithPopup: (authProvider: firebase.auth.AuthProvider) => SagaIterator
  linkWithRedirect: (authProvider: firebase.auth.AuthProvider) => SagaIterator
  sendEmailVerification: (
    actionCodeSettings: firebase.auth.ActionCodeSettings,
  ) => SagaIterator
  sendPasswordResetEmail: (
    email: string,
    actionCodeSettings: firebase.auth.ActionCodeSettings,
  ) => SagaIterator
  signInAndRetrieveDataWithCredential: (
    credential: firebase.auth.AuthCredential,
  ) => SagaIterator
  signInAnonymously: () => SagaIterator
  signInWithCredential: (credential: firebase.auth.AuthCredential) => SagaIterator
  signInWithCustomToken: (token: string) => SagaIterator
  signInWithEmailAndPassword: (email: string, password: string) => SagaIterator
  signInWithPhoneNumber: (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ) => SagaIterator
  signInWithPopup: (authProvider: firebase.auth.AuthProvider) => SagaIterator
  signInWithRedirect: (authProvider: firebase.auth.AuthProvider) => SagaIterator
  signOut: () => SagaIterator
  unlink: (provider: string) => SagaIterator
  updateEmail: (email: string) => SagaIterator
  updatePassword: (password: string) => SagaIterator
  updateProfile: (profile: object) => SagaIterator
}

interface Database {
  read: (pathOrRef: PathOrRef.Database) => SagaIterator
  create: (pathOrRef: PathOrRef.Database, data: any) => SagaIterator
  update: (pathOrRef: PathOrRef.Database, data: any) => SagaIterator
  patch: (pathOrRef: PathOrRef.Database, data: any) => SagaIterator
  delete: (pathOrRef: PathOrRef.Database) => SagaIterator
  channel: (
    pathOrRef: PathOrRef.Database,
    event: string,
  ) => Channel<ChannelOutput.Database>
  sync: (pathOrRef: PathOrRef.Database, options: object, event: string) => SagaIterator
}

interface Firestore {
  addDocument: (collectionRef: PathOrRef.Collection, data: object) => SagaIterator
  channel: (
    pathOrRef: PathOrRef.Firestore,
    type: FirestoreType,
  ) => Channel<ChannelOutput.Firestore>
  deleteDocument: (documentRef: PathOrRef.Document) => SagaIterator
  getCollection: (collectionRef: PathOrRef.Collection) => SagaIterator
  getDocument: (documentRef: PathOrRef.Document) => SagaIterator
  setDocument: (
    documentRef: PathOrRef.Document,
    data: object,
    options: firebase.firestore.SetOptions,
  ) => SagaIterator
  syncCollection: <T>(
    collectionRef: PathOrRef.Collection,
    options: SyncOptions<ChannelOutput.Firestore, T>,
  ) => SagaIterator
  syncDocument: <T>(
    documentRef: PathOrRef.Document,
    options: SyncOptions<ChannelOutput.Firestore, T>,
  ) => SagaIterator
  updateDocument: (documentRef: PathOrRef.Document, ...args: any[]) => SagaIterator
}

interface Functions {
  call: (functionName: string, queryParams: object, init: object) => any
}

interface Messaging {
  channel: () => Channel<ChannelOutput.Messaging.Message>
  syncMessages: <T>(
    options: SyncOptions<ChannelOutput.Messaging.Message, T>,
  ) => SagaIterator
  syncToken: <T>(options: SyncOptions<ChannelOutput.Messaging.Token, T>) => SagaIterator
  tokenRefreshChannel: () => Channel<ChannelOutput.Messaging.Token>
}

interface Storage {
  uploadFile: (
    pathOrRef: PathOrRef.Storage,
    file: Blob | Uint8Array | ArrayBuffer,
    metadata?: firebase.storage.UploadMetadata,
  ) => firebase.storage.UploadTask
  uploadString: (
    pathOrRef: PathOrRef.Storage,
    string: string,
    format: firebase.storage.StringFormat,
    metadata: firebase.storage.UploadMetadata,
  ) => firebase.storage.UploadTask
  getDownloadURL: (pathOrRef: PathOrRef.Storage) => SagaIterator
  getFileMetadata: (pathOrRef: PathOrRef.Storage) => SagaIterator
  updateFileMetadata: (
    pathOrRef: PathOrRef.Storage,
    newMetadata: firebase.storage.SettableMetadata,
  ) => SagaIterator
  deleteFile: (pathOrRef: PathOrRef.Storage) => SagaIterator
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

  constructor(firebaseApp: firebase.app.App)

  projectId(): string
}

export default ReduxSagaFirebase
