import ReactGA from 'react-ga';
import { takeEvery } from 'redux-saga/effects';
import { types as loginTypes } from '../reducer/login.actions';
import { types as storageTypes } from '../reducer/storage.actions';
import { types as todosTypes } from '../reducer/todos.actions';

function loginSaga({ user }) {
  if (user) {
    ReactGA.set({ userId: user.uid });
    ReactGA.event({
      category: 'User',
      action: 'Login'
    });
  }
  else {
    ReactGA.set({ userId: undefined });
    ReactGA.event({
      category: 'User',
      action: 'Logout'
    });
  }
}

function newTodoSaga() {
  ReactGA.event({
    category: 'Todo',
    action: 'Create'
  });
}

function updateTodoSaga() {
  ReactGA.event({
    category: 'Todo',
    action: 'Update'
  });
}

function sendFileSaga() {
  ReactGA.event({
    category: 'File',
    action: 'Send'
  });
}

export default function* functionRootSaga() {
  yield [
    takeEvery(loginTypes.SYNC_USER, loginSaga),
    takeEvery(todosTypes.TODOS.NEW.SAVE, newTodoSaga),
    takeEvery(todosTypes.TODOS.SET_STATUS, updateTodoSaga),
    takeEvery(storageTypes.SEND_FILE, sendFileSaga),
  ];
}
