import React, { PureComponent } from 'react';

import Button from './Button';

import './FileButton.styl';

class FileButton extends PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.input.click();
  }

  render() {
    const {
      children,
      onChange,
      ...props,
    } = this.props;

    return <div className="file-button">
      <input
        type="file"
        onChange={onChange}
        ref={ref => this.input = ref}
      />
      <Button onClick={this.onClick} {...props}>
        { children }
      </Button>
    </div>;
  }
}

FileButton.propTypes = {
  children: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func,
};

export default FileButton;
