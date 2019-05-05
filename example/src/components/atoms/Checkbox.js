import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { check } from '@assets'

const Container = styled.p`
  display: inline-block;
  margin: 0;
  line-height: ${p => 3 * p.theme.spacing}px;
  height: ${p => 3 * p.theme.spacing}px;
  position: relative;
`

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  left: -9999px;
  position: absolute;

  & + label {
    cursor: pointer;
    padding-left: ${p => 4 * p.theme.spacing}px;

    &::before {
      border: ${p => p.theme.spacing / 4}px solid ${p => p.theme.colour.primary};
      border-radius: ${p => p.theme.spacing / 4}px;
      box-sizing: border-box;
      content: '';
      height: ${p => 3 * p.theme.spacing}px;
      left: 0;
      position: absolute;
      top: 0;
      width: ${p => 3 * p.theme.spacing}px;
    }
  }

  &:checked + label {
    &::before {
      background: url(${check}) no-repeat 50% 50% ${p => p.theme.colour.primary};
    }
  }
`

class Checkbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }

  render() {
    const { checked, children, id, onChange } = this.props

    return (
      <Container>
        <StyledCheckbox id={id} checked={checked} onChange={onChange} />
        <label htmlFor={id}>{children}</label>
      </Container>
    )
  }
}

export default Checkbox
