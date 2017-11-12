import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects';

import {
  types,
  syncTodos,
} from '../reducer/todos.actions';

import rsf from '../rsf';

function* saveNewTodo() {
  const user = yield select(state => state.login.user);
  const newTodo = yield select(state => state.todos.new);

  yield call(rsf.firestore.addDocument, 'todos', {
    creator: user ? user.uid : null,
    done: false,
    label: newTodo,
  });
}

function* setTodoStatus(action) {
  yield call(rsf.firestore.updateDocument, `todos/${action.todoId}`, {
    done: action.done,
  });
}

export default function* rootSaga() {
  const todosTransformer = todos => {
    const res = [];
    todos.forEach(doc => res.push({
      id: doc.id,
      ...doc.data()
    }))
    return res;
  }

  yield [
    rsf.firestore.syncCollection(
      'todos',
      {
        successActionCreator: syncTodos,
        transform: todosTransformer
      }
    ),
    takeEvery(types.TODOS.NEW.SAVE, saveNewTodo),
    takeEvery(types.TODOS.SET_STATUS, setTodoStatus),
  ];
}
