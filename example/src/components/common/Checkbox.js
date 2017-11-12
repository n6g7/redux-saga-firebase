import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './Checkbox.styl'

class Checkbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };

  render () {
    const {
      checked,
      children,
      id,
      onChange
    } = this.props

    return <p className='checkbox'>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </p>
  }
}

export default Checkbox
