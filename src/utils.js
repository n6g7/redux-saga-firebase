import { cancelled, put, take } from 'redux-saga/effects'

export function * syncChannel (channel, options) {
  const {
    successActionCreator,
    failureActionCreator,
    transform
  } = options

  try {
    while (true) {
      const data = yield take(channel)
      const transformedData = transform ? transform(data) : data
      yield put(successActionCreator(transformedData))
    }
  } catch (err) {
    if (failureActionCreator) yield put(failureActionCreator(err))
  } finally {
    if (yield cancelled()) channel.close()
  }
}
