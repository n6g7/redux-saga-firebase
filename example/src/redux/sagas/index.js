import functions from './functions';
import login from './login';
import todos from './todos';

export default function* rootSaga() {
  yield [
    functions(),
    login(),
    todos(),
  ];
}
