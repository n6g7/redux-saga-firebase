import auth from './auth';

class ReduxSagaFirebase {
  constructor(firebaseApp) {
    this.app = firebaseApp;

    // Authentication methods
    this.login = auth.login.bind(this);
    this.logout = auth.logout.bind(this);
    this.authChannel = auth.authChannel.bind(this);
  }
}

export default ReduxSagaFirebase;
