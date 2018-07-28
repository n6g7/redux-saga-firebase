import { eventChannel } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'

import { syncChannel } from './utils'

function channel() {
  if (this._messageChannel) return this._messageChannel

  const messaging = this.app.messaging()

  const channel = eventChannel(emit => {
    const unsubscribe = messaging.onMessage(emit)

    return unsubscribe
  })

  this._messageChannel = channel
  return channel
}

function* syncMessages(options) {
  const channel = yield call(this.messaging.channel)
  yield fork(syncChannel, channel, options)
}

function tokenRefreshChannel() {
  if (this._tokenRefreshChannel) return this._tokenRefreshChannel
  const messaging = this.app.messaging()

  const channel = eventChannel(emit => {
    const unsubscribe = messaging.onTokenRefresh(() => {
      messaging.getToken().then(emit)
    })

    return unsubscribe
  })

  this._tokenRefreshChannel = channel
  return channel
}

function* syncToken(options) {
  const channel = yield call(this.messaging.tokenRefreshChannel)
  yield fork(syncChannel, channel, options)
}

export default {
  channel,
  syncMessages,
  syncToken,
  tokenRefreshChannel,
}
