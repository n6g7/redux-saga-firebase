import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  changeNewTodo,
  saveNewTodo,
  setTodoStatus
} from '@actions/todos'

import { Checkbox } from '@atoms'
import { Example, InputGroup } from '@molecules'

import './TodoList.styl'

import extractLines from '../../extract'
import todosSaga from '../../redux/sagas/todos.js?raw'

const doc = extractLines(todosSaga)

class TodoList extends PureComponent {
  static propTypes = {
    changeNewTodo: PropTypes.func.isRequired,
    newTodo: PropTypes.string.isRequired,
    saveNewTodo: PropTypes.func.isRequired,
    setTodoStatus: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired
  };

  render () {
    return <Example
      title='Todo list'
      className='todo-list'
      snippets={[
        doc(10, 19),
        `function* syncTodosSaga() {
  yield fork(
    rsf.database.sync,
    'todos',
    { successActionCreator: syncTodos }
  );
}`
      ]}
    >
      <p>
        Open this page in <a href='#' target='blank'>another tab or window</a> to see the realtime database in action!
      </p>

      <InputGroup
        value={this.props.newTodo}
        onChange={e => this.props.changeNewTodo(e.target.value)}
        placeholder='New todo'
        onSubmit={this.props.saveNewTodo}
      >
        Add item
      </InputGroup>

      <ul className='checklist'>
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
    </Example>
  }
}

const mapStateToProps = state => ({
  newTodo: state.todos.new,
  todos: state.todos.list
})
const mapDispatchToProps = {
  changeNewTodo,
  saveNewTodo,
  setTodoStatus
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
