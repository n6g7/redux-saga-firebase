import ReactGA from 'react-ga'
import { all, takeEvery } from 'redux-saga/effects'
import { types as loginTypes } from '@actions/login'
import { types as storageTypes } from '@actions/storage'
import { types as todosTypes } from '@actions/todos'

function loginSaga ({ user }) {
  if (user) {
    ReactGA.set({ userId: user.uid })
    ReactGA.event({
      category: 'User',
      action: 'Login'
    })
  } else {
    ReactGA.set({ userId: undefined })
    ReactGA.event({
      category: 'User',
      action: 'Logout'
    })
  }
}

function newTodoSaga () {
  ReactGA.event({
    category: 'Todo',
    action: 'Create'
  })
}

function updateTodoSaga () {
  ReactGA.event({
    category: 'Todo',
    action: 'Update'
  })
}

function setFirestoreSaga ({ useFirestore }) {
  ReactGA.event({
    category: 'Todo',
    action: 'Toggle firestore',
    label: useFirestore ? 'activate' : 'deactivate'
  })
}

function sendFileSaga () {
  ReactGA.event({
    category: 'File',
    action: 'Send'
  })
}

export default function * functionRootSaga () {
  yield all([
    takeEvery(loginTypes.SYNC_USER, loginSaga),
    takeEvery(todosTypes.TODOS.NEW.SAVE, newTodoSaga),
    takeEvery(todosTypes.TODOS.SET_STATUS, updateTodoSaga),
    takeEvery(todosTypes.TODOS.SET_FIRESTORE, setFirestoreSaga),
    takeEvery(storageTypes.SEND_FILE, sendFileSaga)
  ])
}
