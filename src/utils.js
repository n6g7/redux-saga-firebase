import { cancelled, put, take } from 'redux-saga/effects'

export const noop = x => x

export function * syncChannel (channel, actionCreator, transform = noop) {
  try {
    while (true) {
      const data = yield take(channel)
      yield put(actionCreator(transform(data)))
    }
  } finally {
    if (yield cancelled()) channel.close()
  }
}
