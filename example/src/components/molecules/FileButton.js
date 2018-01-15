import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from '@atoms'

const Input = styled.input.attrs({
  type: 'file'
})`
  display: none;
`

class FileButton extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    onChange: PropTypes.func
  };

  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.input.click()
  }

  render () {
    const {
      children,
      onChange,
      ...props
    } = this.props

    return <div>
      <Input
        onChange={onChange}
        innerRef={ref => { this.input = ref }}
      />
      <Button onClick={this.onClick} {...props}>
        { children }
      </Button>
    </div>
  }
}

export default FileButton
