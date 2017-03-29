import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  login,
  logout,
} from './redux/reducer/login.actions';
import {
  sendFile,
  setFile,
} from './redux/reducer/storage.actions';
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

      <h2>Storage</h2>
      <p>
        <input
          type="file"
          onChange={e => this.props.setFile(e.target.files[0])}
        />
        <button onClick={this.props.sendFile}>Send file</button>
        <img src={this.props.fileURL} width="300" />
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
  file: state.storage.file,
  fileURL: state.storage.url,
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
  sendFile,
  setFile,
  setTodoStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
