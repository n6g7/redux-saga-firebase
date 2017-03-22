import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';

function* get(path) {
  const ref = this.app.database().ref(path);
  const result = yield call([ref, ref.once], 'value');

  return result.val();
}

function* create(path, data) {
  const ref = this.app.database().ref(path);
  const result = yield call([ref, ref.push], data);

  return result;
}

function* update(path, data) {
  const ref = this.app.database().ref(path);
  const result = yield call([ref, ref.set], data);

  return result;
}

function* patch(path, data) {
  const ref = this.app.database().ref(path);
  const result = yield call([ref, ref.update], data);

  return result;
}

function* _delete(path) {
  const ref = this.app.database().ref(path);
  const result = yield call([ref, ref.remove]);

  return result;
}

function channel(path, event='value') {
  const ref = this.app.database().ref(path);

  const channel = eventChannel(emit => {
    const callback = ref.on(
      event,
      dataSnapshot => emit(dataSnapshot.val())
    );

    // Returns unsubscribe function
    return () => ref.off(event, callback);
  });

  return channel;
}

export default {
  get,
  create,
  update,
  patch,
  delete: _delete,
  channel,
};
