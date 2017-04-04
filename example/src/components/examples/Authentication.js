import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  login,
  logout,
} from '../../redux/reducer/login.actions';

import Example from './Example';
import Button from '../common/Button';

import './Authentication.styl';

import extractLines from '../../extract';
import authSaga from '!raw-loader!../../redux/sagas/login.js';

const doc = extractLines(authSaga);

class Authentication extends PureComponent {
  render() {
    return <Example
      title="Authentication"
      snippets={[
        doc(17, 25),
        doc(37, 46),
      ]}
      className="authentication"
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
    </Example>;
  }
}

Authentication.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});
const mapDispatchToProps = {
  login,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
