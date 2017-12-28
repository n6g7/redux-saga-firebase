import React, { PureComponent } from 'react'

import {
  AuthenticationExample,
  Footer,
  Header,
  StorageExample,
  TodoListExample
} from '@organisms'

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
