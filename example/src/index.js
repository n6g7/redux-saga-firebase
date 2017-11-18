import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'

import App from './components/App'
import store from './redux/store'

import 'whatwg-fetch'

ReactGA.initialize('UA-62266834-2')
ReactGA.set({ page: window.location.pathname + window.location.search })
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
