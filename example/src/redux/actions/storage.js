export const types = {
  SEND_FILE: 'SEND_FILE',
  SET_FILE: 'SET_FILE',
  SET_FILE_URL: 'SET_FILE_URL',
}

export const setFile = file => ({
  type: types.SET_FILE,
  file,
})

export const setFileURL = url => ({
  type: types.SET_FILE_URL,
  url,
})

export const sendFile = () => ({
  type: types.SEND_FILE,
})
