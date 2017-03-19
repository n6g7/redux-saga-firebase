import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { login, logout } from './redux/actions';

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

      <h2>Synced users</h2>
      <ul>
        { this.props.users.map((user, index) =>
          <li key={index}>{ user }</li>
        )}
      </ul>
    </div>;
  }
}

Component.propTypes = {
  login: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  users: state.syncUser,
});
const mapDispatchToProps = {
  login,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
