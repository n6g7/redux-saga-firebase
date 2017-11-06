import { cancelled, put, take } from 'redux-saga/effects'

export const noop = x => x

export function * syncChannel (channel, successActionCreator, transform = noop, failureActionCreator = null) {
  try {
    while (true) {
      const data = yield take(channel)
      yield put(successActionCreator(transform(data)))
    }
  } catch (err) {
    if (failureActionCreator) yield put(failureActionCreator(err))
  } finally {
    if (yield cancelled()) channel.close()
  }
}
