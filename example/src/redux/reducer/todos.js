import { types } from '@actions/todos'

const initialState = {
  list: [],
  new: '',
  useFirestore: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.TODOS.SYNC:
      return {
        ...state,
        list: action.todos
      }
    case types.TODOS.NEW.CHANGE:
      return {
        ...state,
        new: action.todo
      }
    case types.TODOS.SET_FIRESTORE:
      return {
        ...state,
        useFirestore: action.useFirestore
      }
    default:
      return state
  }
}
