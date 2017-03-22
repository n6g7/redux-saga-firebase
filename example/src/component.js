import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  login,
  logout,
} from './redux/reducer/login.actions';
import {
  changeNewTodo,
  saveNewTodo,
  setTodoStatus,
} from './redux/reducer/todos.actions';

import './style.css';

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

      <h2>Todo list</h2>
      <ul>
        { this.props.todos.map(todo =>
          <li
            className={todo.done ? 'done' : ''}
            key={todo.id}
            onClick={() => this.props.setTodoStatus(todo.id, !todo.done)}
          >
            { todo.label }
          </li>
        )}
      </ul>

      <p>
        New todo:
        <input
          value={this.props.newTodo}
          onChange={e => this.props.changeNewTodo(e.target.value)}
        />
        <button
          onClick={this.props.saveNewTodo}
        >
          Save
        </button>
      </p>
    </div>;
  }
}

Component.propTypes = {
  changeNewTodo: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  newTodo: React.PropTypes.string.isRequired,
  saveNewTodo: React.PropTypes.func.isRequired,
  setTodoStatus: React.PropTypes.func.isRequired,
  todos: React.PropTypes.array.isRequired,
  user: React.PropTypes.object,
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  newTodo: state.todos.new,
  todos: state.todos.list,
  user: state.login.user,
});
const mapDispatchToProps = {
  changeNewTodo,
  login,
  logout,
  saveNewTodo,
  setTodoStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
