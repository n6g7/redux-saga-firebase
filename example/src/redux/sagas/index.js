import login from './login';
import todos from './todos';

export default function* rootSaga() {
  yield [
    login(),
    todos(),
  ];
}
