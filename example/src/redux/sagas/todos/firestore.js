import { call, fork, select, takeEvery } from 'redux-saga/effects'

import {
  types,
  syncTodos
} from '@actions/todos'
import { userSelector } from '@selectors/login'

import rsf from '../../rsf'

function * saveNewTodo () {
  const user = yield select(userSelector)
  const newTodo = yield select(state => state.todos.new)

  yield call(rsf.firestore.addDocument, 'todos', {
    creator: user ? user.uid : null,
    done: false,
    label: newTodo
  })
}

function * setTodoStatus (action) {
  yield call(rsf.firestore.updateDocument, `todos/${action.todoId}`, {
    done: action.done
  })
}

const todosTransformer = todos => {
  const res = []
  todos.forEach(doc => res.push({
    id: doc.id,
    ...doc.data()
  }))
  return res
}

function * syncTodosSaga () {
  yield fork(
    rsf.firestore.syncCollection,
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
