import React, { PureComponent } from 'react';

import Button from './Button';
import './InputGroup.styl';

class InputGroup extends PureComponent {
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

InputGroup.propTypes = {
  children: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  placeholder: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
  placeholder: '',
  value: '',
};

export default InputGroup;
