import analytics from './analytics';
import functions from './functions';
import login from './login';
import messaging from './messaging';
import storage from './storage';
import todos from './todos';

export default function* rootSaga() {
  yield [
    analytics(),
    functions(),
    login(),
    messaging(),
    storage(),
    todos(),
  ];
}
