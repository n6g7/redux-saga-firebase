import { call, select, takeEvery } from 'redux-saga/effects';
import { types } from '../reducer/todos.actions';

import rsf from '../rsf';

function* ping(action) {
  const newTodo = yield select(state => state.todos.new);
  const { pong } = yield call(rsf.call, 'ping', {
    ping: newTodo
  });

  console.log('pong:', pong)
}

export default function* functionRootSaga() {
  yield [
    takeEvery(types.TODOS.NEW.SAVE, ping),
  ];
}
