import React, { PureComponent } from 'react'

import Header from './Header'
import Footer from './Footer'
import {
  AuthenticationExample,
  StorageExample,
  TodoListExample
} from './examples'

import './App.styl'

class App extends PureComponent {
  static propTypes = {};

  render () {
    return <main>
      <Header />

      <AuthenticationExample />
      <TodoListExample />
      <StorageExample />

      <Footer />
    </main>
  }
}

export default App
