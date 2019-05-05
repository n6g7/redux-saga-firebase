export const types = {
  TODOS: {
    SYNC: 'TODOS.SYNC',
    SET_STATUS: 'TODOS.SET_STATUS',
    NEW: {
      CHANGE: 'TODOS.NEW.CHANGE',
      SAVE: 'TODOS.NEW.SAVE',
    },
    SET_FIRESTORE: 'TODOS.SET_FIRESTORE',
  },
}

export const syncTodos = todos => ({
  type: types.TODOS.SYNC,
  todos,
})

export const changeNewTodo = todo => ({
  type: types.TODOS.NEW.CHANGE,
  todo,
})

export const saveNewTodo = () => ({
  type: types.TODOS.NEW.SAVE,
})

export const setTodoStatus = (todoId, done) => ({
  type: types.TODOS.SET_STATUS,
  todoId,
  done,
})

export const setFirestore = useFirestore => ({
  type: types.TODOS.SET_FIRESTORE,
  useFirestore,
})
