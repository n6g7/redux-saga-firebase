import auth from './auth'
import database from './database'

class ReduxSagaFirebase {
  constructor (firebaseApp) {
    this.app = firebaseApp

    // Authentication methods
    this.login = auth.login.bind(this)
    this.logout = auth.logout.bind(this)
    this.authChannel = auth.authChannel.bind(this)

    // Database methods
    this.get = database.get.bind(this)
    this.create = database.create.bind(this)
    this.update = database.update.bind(this)
    this.patch = database.patch.bind(this)
    this.delete = database.delete.bind(this)
    this.channel = database.channel.bind(this)
  }
}

export default ReduxSagaFirebase
