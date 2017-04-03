import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  changeNewTodo,
  saveNewTodo,
  setTodoStatus,
} from '../../redux/reducer/todos.actions';

import Example from './Example';
import { Checkbox, InputGroup } from '../common';

import './TodoList.styl';

const functionSaga = require("!raw-loader!../../redux/sagas/functions.js");

class TodoList extends PureComponent {
  render() {
    return <Example title="Todo list" className="todo-list" snippets={[functionSaga, 'var a = b\nlet e = f']}>
      <InputGroup
        value={this.props.newTodo}
        onChange={e => this.props.changeNewTodo(e.target.value)}
        placeholder="New todo"
        onSubmit={this.props.saveNewTodo}
      >
        Add item
      </InputGroup>

      <ul className="checklist">
        { this.props.todos.map(todo =>
          <li key={todo.id}>
            <Checkbox
              id={todo.id}
              checked={todo.done}
              onChange={() => this.props.setTodoStatus(todo.id, !todo.done)}
              >
              { todo.label }
            </Checkbox>
          </li>
        )}
      </ul>
    </Example>;
  }
}

TodoList.propTypes = {
  changeNewTodo: React.PropTypes.func.isRequired,
  newTodo: React.PropTypes.string.isRequired,
  saveNewTodo: React.PropTypes.func.isRequired,
  setTodoStatus: React.PropTypes.func.isRequired,
  todos: React.PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  newTodo: state.todos.new,
  todos: state.todos.list,
});
const mapDispatchToProps = {
  changeNewTodo,
  saveNewTodo,
  setTodoStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
