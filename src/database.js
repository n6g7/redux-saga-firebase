import { buffers, eventChannel } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'

import { syncChannel } from './utils'

export const getRef = (rsf, pathOrRef) => {
  return typeof pathOrRef === 'string'
    ? rsf.app.database().ref(pathOrRef)
    : pathOrRef
}

function * read (pathOrRef) {
  const ref = getRef(this, pathOrRef)
  const result = yield call([ref, ref.once], 'value')

  return result.val()
}

function * create (pathOrRef, data) {
  const ref = getRef(this, pathOrRef)
  const result = yield call([ref, ref.push], data)

  return result.key
}

function * update (pathOrRef, data) {
  const ref = getRef(this, pathOrRef)
  yield call([ref, ref.set], data)
}

function * patch (pathOrRef, data) {
  const ref = getRef(this, pathOrRef)
  yield call([ref, ref.update], data)
}

function * _delete (pathOrRef) {
  const ref = getRef(this, pathOrRef)
  yield call([ref, ref.remove])
}

function channel (pathOrRef, event = 'value', buffer = buffers.none()) {
  const ref = getRef(this, pathOrRef)

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
  }, buffer)

  return channel
}

const defaultTransform = data => data.value
function * sync (pathOrRef, options, event) {
  const channel = yield call(
    this.database.channel,
    pathOrRef,
    event
  )
  yield fork(
    syncChannel,
    channel,
    {
      transform: defaultTransform,
      ...options
    }
  )
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
