import { types } from './todos.actions';

const initialState = {
  list: [],
  new: '',
};

export default function reducer(state=initialState, action={}) {
  switch(action.type) {
    case types.TODOS.SYNC:
      return {
        ...state,
        list: action.todos,
      };
    case types.TODOS.NEW.CHANGE:
      return {
        ...state,
        new: action.todo,
      };
    default:
      return state;
  }
}
