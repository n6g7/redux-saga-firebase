import { types } from './actions';

const initialState = {
  login: {
    loading: false,
    loggedIn: false,
  },
  syncUser: [],
};

export default function reducer(state=initialState, action={}) {
  switch(action.type) {
    case types.LOGIN.REQUEST:
    case types.LOGOUT.REQUEST:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
        }
      };
    case types.LOGIN.SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          loggedIn: true,
        }
      };
    case types.LOGIN.FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
        }
      };
    case types.LOGOUT.SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          loggedIn: false,
        }
      };
    case types.LOGOUT.FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
        }
      };
    case types.SYNC_USER:
      return {
        ...state,
        syncUser: state.syncUser.concat([action.user]),
      }
    default:
      return state;
  }
}
