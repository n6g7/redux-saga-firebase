export const types = {
  SET_REGISTRATION_TOKEN: 'SET_REGISTRATION_TOKEN'
}

export const setRegistrationToken = token => ({
  type: types.SET_REGISTRATION_TOKEN,
  token
})
