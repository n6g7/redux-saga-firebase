import { eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

const noop = x => x

function * read (pathOrRef) {
  const ref = this._getRef(pathOrRef, 'database')
  const result = yield call([ref, ref.once], 'value')

  return result.val()
}

function * create (pathOrRef, data) {
  const ref = this._getRef(pathOrRef, 'database')
  const result = yield call([ref, ref.push], data)

  return result.key
}

function * update (pathOrRef, data) {
  const ref = this._getRef(pathOrRef, 'database')
  yield call([ref, ref.set], data)
}

function * patch (pathOrRef, data) {
  const ref = this._getRef(pathOrRef, 'database')
  yield call([ref, ref.update], data)
}

function * _delete (pathOrRef) {
  const ref = this._getRef(pathOrRef, 'database')
  yield call([ref, ref.remove])
}

function channel (pathOrRef, event = 'value') {
  const ref = this._getRef(pathOrRef, 'database')

  const channel = eventChannel(emit => {
    const callback = ref.on(
      event,
      dataSnapshot => emit({
        snapshot: dataSnapshot,
        value: dataSnapshot.val()
      })
    )

    // Returns unsubscribe function
    return () => ref.off(event, callback)
  })

  return channel
}

function * sync (pathOrRef, actionCreator, transform = noop) {
  const channel = yield call(this.database.channel, pathOrRef)

  while (true) {
    const { value } = yield take(channel)
    yield put(actionCreator(transform(value)))
  }
}

export default {
  read,
  create,
  update,
  patch,
  delete: _delete,
  channel,
  sync
}
