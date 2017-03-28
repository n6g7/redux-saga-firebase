import functions from './functions';
import login from './login';
import messaging from './messaging';
import todos from './todos';

export default function* rootSaga() {
  yield [
    functions(),
    login(),
    messaging(),
    todos(),
  ];
}
