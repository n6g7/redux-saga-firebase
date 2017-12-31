import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  login,
  logout
} from '@actions/login'

import { Button } from '@atoms'
import { Example } from '@molecules'

import extractLines from '../../extract'
import authSaga from '../../redux/sagas/login.js?raw'

const Container = styled(Example)`
  button + button {
    margin-left: ${p => p.theme.spacing}px;
  }
`

const doc = extractLines(authSaga)

class Authentication extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  render () {
    return <Container
      title='Authentication'
      snippets={[
        doc(17, 25),
        doc(35, 45)
      ]}
    >
      <Button
        onClick={this.props.login}
        disabled={this.props.loggedIn}
      >
        Login
      </Button>
      <Button
        onClick={this.props.logout}
        disabled={!this.props.loggedIn}
      >
        Logout
      </Button>

      <p>User: {this.props.user ? this.props.user.displayName : 'none'}</p>
    </Container>
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user
})
const mapDispatchToProps = {
  login,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication)
