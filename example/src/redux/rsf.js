import firebase from 'firebase';
import ReduxSagaFirebase from '../../../src/index';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSTkbHZIcJluamfb69ShSHXn8351H9Vm0",
  authDomain: "redux-saga-firebase.firebaseapp.com",
  databaseURL: "https://redux-saga-firebase.firebaseio.com",
});

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
