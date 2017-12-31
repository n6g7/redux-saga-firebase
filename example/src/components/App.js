import React, { PureComponent } from 'react'
import styled from 'styled-components'

import {
  AuthenticationExample,
  Footer,
  Header,
  StorageExample,
  TodoListExample
} from '@organisms'

const Container = styled.main`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: ${p => 160 * p.theme.spacing}px;
`

class App extends PureComponent {
  static propTypes = {}

  render () {
    return <Container>
      <Header />

      <AuthenticationExample />
      <TodoListExample />
      <StorageExample />

      <Footer />
    </Container>
  }
}

export default App
