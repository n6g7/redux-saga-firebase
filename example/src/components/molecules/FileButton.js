import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@atoms'

import './FileButton.styl'

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

    return <div className='file-button'>
      <input
        type='file'
        onChange={onChange}
        ref={ref => { this.input = ref }}
      />
      <Button onClick={this.onClick} {...props}>
        { children }
      </Button>
    </div>
  }
}

export default FileButton
