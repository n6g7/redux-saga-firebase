import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects';

import {
  types,
  syncTodos,
} from '../reducer/todos.actions';

import rsf from '../rsf';

function* syncTodosSaga() {
  const channel = yield call(rsf.channel, 'todos');

  while(true) {
    const todos = yield take(channel);
    yield put(syncTodos(
      Object.keys(todos).map(key => ({
        ...todos[key],
        id: key,
      }))
    ));
  }
}

function* saveNewTodo() {
  const user = yield select(state => state.login.user);
  const newTodo = yield select(state => state.todos.new);

  yield call(rsf.create, 'todos', {
    creator: user ? user.uid : null,
    done: false,
    label: newTodo,
  });
}

function* setTodoStatus(action) {
  yield call(rsf.patch, `todos/${action.todoId}`, {
    done: action.done,
  });
}

export default function* rootSaga() {
  yield fork(syncTodosSaga);
  yield [
    takeEvery(types.TODOS.NEW.SAVE, saveNewTodo),
    takeEvery(types.TODOS.SET_STATUS, setTodoStatus),
  ];
}
