import { call } from 'redux-saga/effects'

export function getFunctionURL (functionName, parameters = {}) {
  const baseUrl = `https://${this.region}-${this.projectId()}.cloudfunctions.net/${functionName}`
  const query = Object
    .keys(parameters)
    .map(key => `${key}=${parameters[key]}`)
    .join('&')

  if (query) return `${baseUrl}?${query}`
  else return baseUrl
}

function * _call (functionName, parameters = {}) {
  const url = getFunctionURL.call(this, functionName, parameters)

  const response = yield call(fetch, url)

  if (!response.ok) throw response

  const contentType = response.headers.get('Content-Type')
  const parser = contentType.startsWith('application/json')
    ? response.json
    : response.text

  const data = yield call([response, parser])

  return data
}

export default {
  call: _call
}
