export const types = {
  LOGIN: {
    REQUEST: '@@RSF_LOGIN.REQUEST',
    SUCCESS: '@@RSF_LOGIN.SUCCESS',
    FAILURE: '@@RSF_LOGIN.FAILURE',
  },
  LOGOUT: {
    REQUEST: '@@RSF_LOGOUT.REQUEST',
    SUCCESS: '@@RSF_LOGOUT.SUCCESS',
    FAILURE: '@@RSF_LOGOUT.FAILURE',
  },
  SET_CREDENTIAL: '@@RSF_SET_CREDENTIAL',
}

export const login = () => ({
  type: types.LOGIN.REQUEST
});

export const loginSuccess = user => ({
  type: types.LOGIN.SUCCESS,
  user,
});

export const loginFailure = error => ({
  type: types.LOGIN.FAILURE,
  error,
});

export const logout = () => ({
  type: types.LOGOUT.REQUEST
});

export const logoutSuccess = () => ({
  type: types.LOGOUT.SUCCESS,
});

export const logoutFailure = error => ({
  type: types.LOGOUT.FAILURE,
  error,
});

export const setCredential = credential => ({
  type: types.SET_CREDENTIAL,
  credential,
})
