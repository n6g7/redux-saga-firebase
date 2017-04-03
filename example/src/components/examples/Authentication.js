import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  login,
  logout,
} from '../../redux/reducer/login.actions';

import Example from './Example';
import Button from '../common/Button';

import './Authentication.styl';

const functionSaga = require("!raw-loader!../../redux/sagas/functions.js");

class Authentication extends PureComponent {
  render() {
    return <Example
      title="Authentication"
      snippets={[functionSaga, 'var a = b\nlet e = f']}
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
