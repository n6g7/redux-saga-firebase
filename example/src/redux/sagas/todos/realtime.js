import { call, fork, select, takeEvery } from 'redux-saga/effects'

import {
  types,
  syncTodos
} from '@actions/todos'

import rsf from '../../rsf'

function * saveNewTodo () {
  const user = yield select(state => state.login.user)
  const newTodo = yield select(state => state.todos.new)

  yield call(rsf.database.create, 'todos', {
    creator: user ? user.uid : null,
    done: false,
    label: newTodo
  })
}

function * setTodoStatus (action) {
  yield call(rsf.database.patch, `todos/${action.todoId}`, {
    done: action.done
  })
}

const todosTransformer = ({ value }) => Object.keys(value).map(key => ({
  ...value[key],
  id: key
}))

function * syncTodosSaga () {
  yield fork(
    rsf.database.sync,
    'todos',
    {
      successActionCreator: syncTodos,
      transform: todosTransformer
    }
  )
}

export default function * rootSaga () {
  yield [
    fork(syncTodosSaga),
    takeEvery(types.TODOS.NEW.SAVE, saveNewTodo),
    takeEvery(types.TODOS.SET_STATUS, setTodoStatus)
  ]
}
