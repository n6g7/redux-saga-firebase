import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from '../../../src/index';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSTkbHZIcJluamfb69ShSHXn8351H9Vm0",
  authDomain: "redux-saga-firebase.firebaseapp.com",
  databaseURL: "https://redux-saga-firebase.firebaseio.com",
  projectId: "redux-saga-firebase",
  storageBucket: "redux-saga-firebase.appspot.com",
  messagingSenderId: "231632772443"
});

const rsf = new ReduxSagaFirebase(
  firebaseApp,
  firebase.firestore()
);

export default rsf;
