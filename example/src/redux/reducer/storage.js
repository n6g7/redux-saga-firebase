import { types } from './storage.actions';

const initialState = {
  file: null,
  loading: false,
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
        loading: false,
        url: action.url,
      }
    case types.SEND_FILE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
