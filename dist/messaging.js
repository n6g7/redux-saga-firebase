'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxSaga = require('redux-saga');

function channel() {
  if (this._messageChannel) return this._messageChannel;

  var messaging = this.app.messaging();

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = messaging.onMessage(emit);

    return unsubscribe;
  });

  this._messageChannel = channel;
  return channel;
}

function tokenRefreshChannel() {
  if (this._tokenRefreshChannel) return this._tokenRefreshChannel;
  var messaging = this.app.messaging();

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = messaging.onTokenRefresh(function () {
      messaging.getToken().then(emit);
    });

    return unsubscribe;
  });

  this._tokenRefreshChannel = channel;
  return channel;
}

exports.default = {
  channel: channel,
  tokenRefreshChannel: tokenRefreshChannel
};