import login from './login';

export default function* rootSaga() {
  yield [
    login(),
  ];
}
