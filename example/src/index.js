import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { ThemeProvider } from 'styled-components'

import App from './components/App'
import store from './redux/store'
import theme from './theme'

import 'whatwg-fetch'

ReactGA.initialize('UA-62266834-2')
ReactGA.set({ page: window.location.pathname + window.location.search })
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)
