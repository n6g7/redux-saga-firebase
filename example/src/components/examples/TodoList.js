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

import extractLines from '../../extract';
import todosSaga from '!raw-loader!../../redux/sagas/todos.js';

const doc = extractLines(todosSaga);

class TodoList extends PureComponent {
  render() {
    return <Example
      title="Todo list"
      className="todo-list"
      snippets={[
        doc(10, 19),
        `function* syncTodosSaga() {
  yield fork(
    rsf.database.sync,
    \'todos\',
    { successActionCreator: syncTodos }
  );
}`,
      ]}
    >
      <p>
        Open this page in <a href="#" target="blank">another tab or window</a> to see the realtime database in action!
      </p>

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
