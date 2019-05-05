import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { Button, Link } from '@atoms'

export const Container = styled.header`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  padding: ${p => 7 * p.theme.spacing}px 0;

  p {
    margin: 0;
    max-width: ${p => 100 * p.theme.spacing}px;

    &:not(:last-of-type) {
      margin: 0 0 ${p => p.theme.spacing}px;
    }
  }

  nav {
    display: flex;
    flex-flow: row nowrap;
    margin-top: ${p => 3 * p.theme.spacing}px;

    a,
    button {
      &:not(:last-child) {
        margin-right: ${p => 2 * p.theme.spacing}px;
      }
    }
  }
`

const Title = styled.h1`
  color: ${p => p.theme.colour.primary};
  font-family: 'Oswald', sans-serif;
  font-size: ${p => 4 * p.theme.spacing}px;
  margin: 0 0 ${p => 3 * p.theme.spacing}px;
  text-transform: uppercase;
`

const Abbr = styled.abbr`
  border-bottom: 1px dashed lighten(black, 60%);
  cursor: help;
`

class Header extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <Container>
        <Title>redux-saga-firebase</Title>

        <p>
          <Abbr title="redux-saga-firebase">RSF</Abbr> is a{' '}
          <Link href="https://redux-saga.github.io/redux-saga/" target="blank">
            redux-saga
          </Link>{' '}
          implementation of the{' '}
          <Link href="https://firebase.google.com/docs/reference/js/" target="blank">
            Firebase API
          </Link>
          .
        </p>

        <p>
          Its aims to make every interaction with Firebase as simple as possible by
          exposing{' '}
          <Link
            href="https://redux-saga.github.io/redux-saga/docs/api/index.html#callfn-args"
            target="blank"
          >
            <code>call</code>
          </Link>
          -able methods and{' '}
          <Link
            href="https://redux-saga.github.io/redux-saga/docs/api/index.html#channel"
            target="blank"
          >
            channels
          </Link>
          . It supports authentication, database operations, file storage, messaging and
          functions calls.
        </p>

        <p>Below is a collection of examples.</p>

        <nav>
          <Button.GitHub />
          <Button.Docs />
        </nav>
      </Container>
    )
  }
}

export default Header
