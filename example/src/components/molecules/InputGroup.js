import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from '@atoms'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
`

const Input = styled.input.attrs({
  type: 'text'
})`
  border-right: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`

const StyledButton = styled(Button)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  min-width: 0;

  &:active {
    transform: none;
  }
`

class InputGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    placeholder: '',
    value: ''
  };

  render () {
    const {
      children,
      onChange,
      onSubmit,
      placeholder,
      value
    } = this.props

    return <Container>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <StyledButton onClick={onSubmit}>
        { children }
      </StyledButton>
    </Container>
  }
}

export default InputGroup
