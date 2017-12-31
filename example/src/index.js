import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { injectGlobal, ThemeProvider } from 'styled-components'

import App from './components/App'
import store from './redux/store'
import theme from './theme'

import 'whatwg-fetch'

ReactGA.initialize('UA-62266834-2')
ReactGA.set({ page: window.location.pathname + window.location.search })
ReactGA.pageview(window.location.pathname + window.location.search)

injectGlobal`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${theme.colour.background};
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 14px;
    margin: 0;
    text-align: center;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)
