import { types } from './messaging.actions'

const initialState = {
  registrationToken: null
}

export default function messagingReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_REGISTRATION_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}
