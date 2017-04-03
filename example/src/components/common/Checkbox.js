import React, { PureComponent } from 'react';

import './Checkbox.styl';

class Checkbox extends PureComponent {
  render() {
    const {
      checked,
      children,
      id,
      onChange,
    } = this.props;

    return <p className="checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
    <label htmlFor={id}>{children}</label>
    </p>;
  }
}

Checkbox.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  children: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
};

export default Checkbox;
