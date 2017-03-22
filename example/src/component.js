import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  login,
  logout,
} from './redux/reducer/login.actions';

class Component extends PureComponent {
  renderButton(label, onClick, disabled) {
    return <button
      disabled={disabled}
      onClick={onClick}
    >
      { label }
    </button>;
  }

  render() {
    return <div>
      { this.renderButton('Login', this.props.login, this.props.loggedIn)}
      { this.renderButton('Logout', this.props.logout, !this.props.loggedIn)}

      <p>User: {this.props.user ? this.props.user.displayName : 'none'}</p>
    </div>;
  }
}

Component.propTypes = {
  login: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
}

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
)(Component);
