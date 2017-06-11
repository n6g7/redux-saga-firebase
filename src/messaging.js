import { eventChannel } from 'redux-saga'

function channel () {
  if (this._messageChannel) return this._messageChannel

  const messaging = this.app.messaging()

  const channel = eventChannel(emit => {
    const unsubscribe = messaging.onMessage(emit)

    return unsubscribe
  })

  this._messageChannel = channel
  return channel
}

function tokenRefreshChannel () {
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

export default {
  channel,
  tokenRefreshChannel
}
