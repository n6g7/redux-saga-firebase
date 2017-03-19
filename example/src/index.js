import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Component from './component';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Component />
  </Provider>,
  document.getElementById('app')
);
