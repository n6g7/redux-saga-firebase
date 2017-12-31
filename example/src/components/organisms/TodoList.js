import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  changeNewTodo,
  saveNewTodo,
  setTodoStatus
} from '@actions/todos'

import { Checkbox, Link } from '@atoms'
import { Example, InputGroup } from '@molecules'

import extractLines from '../../extract'
import todosSaga from '../../redux/sagas/todos.js?raw'

const StyledInputGroup = styled(InputGroup)`
  margin: ${p => 2 * p.theme.spacing}px auto 0;
  width: ${p => 40 * p.theme.spacing}px;

  input {
    flex-grow: 1;
  }
`

const Checklist = styled.ul`
  align-items: stretch;
  display: inline-flex;
  flex-flow: column nowrap;
  list-style: none;
  margin: ${p => 3 * p.theme.spacing}px 0 0;
  padding: 0;
  width: ${p => 40 * p.theme.spacing}px;
`

const ChecklistItem = styled.li`
  text-align: left;

  &:not(:first-child) {
    margin-top: ${p => p.theme.spacing}px;
  }
`

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
        Open this page in <Link href='#' target='blank'>another tab or window</Link> to see the realtime database in action!
      </p>

      <StyledInputGroup
        value={this.props.newTodo}
        onChange={e => this.props.changeNewTodo(e.target.value)}
        placeholder='New todo'
        onSubmit={this.props.saveNewTodo}
      >
        Add item
      </StyledInputGroup>

      <Checklist>
        { this.props.todos.map(todo =>
          <ChecklistItem key={todo.id}>
            <Checkbox
              id={todo.id}
              checked={todo.done}
              onChange={() => this.props.setTodoStatus(todo.id, !todo.done)}
              >
              { todo.label }
            </Checkbox>
          </ChecklistItem>
        )}
      </Checklist>
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
