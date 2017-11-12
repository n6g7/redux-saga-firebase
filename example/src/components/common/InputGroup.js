import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import './InputGroup.styl';

class InputGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  static defaultProps = {
    placeholder: '',
    value: '',
  };

  render() {
    const {
      children,
      onChange,
      onSubmit,
      placeholder,
      value,
    } = this.props;

    return <div className="input-group">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button onClick={onSubmit}>
        { children }
      </Button>
    </div>;
  }
}

export default InputGroup;
