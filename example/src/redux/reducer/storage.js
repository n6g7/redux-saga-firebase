import { types } from './storage.actions';

const initialState = {
  file: null,
  url: null,
};

export default function storageReducer(state=initialState, action={}) {
  switch (action.type) {
    case types.SET_FILE:
      return {
        ...state,
        file: action.file,
      }
    case types.SET_FILE_URL:
      return {
        ...state,
        url: action.url,
      }
    default:
      return state;
  }
}
