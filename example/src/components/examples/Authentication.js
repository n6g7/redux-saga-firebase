import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  login,
  logout
} from '../../redux/reducer/login.actions'

import Example from './Example'
import Button from '../common/Button'

import './Authentication.styl'

import extractLines from '../../extract'
import authSaga from '!raw-loader!../../redux/sagas/login.js'

const doc = extractLines(authSaga)

class Authentication extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  render () {
    return <Example
      title='Authentication'
      snippets={[
        doc(17, 25),
        doc(37, 46)
      ]}
      className='authentication'
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
    </Example>
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
