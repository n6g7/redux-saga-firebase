import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  sendFile,
  setFile,
} from '../../redux/reducer/storage.actions';

import Example from './Example';
import { Button, FileButton } from '../common';

import upload from '../../images/upload.svg';

import './Storage.styl';

const functionSaga = require("!raw-loader!../../redux/sagas/functions.js");

class Storage extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const file = event.target.files[0];
    this.props.setFile(file);
    this.props.sendFile();
  }

  render() {
    return <Example title="Storage" className="storage" snippets={[functionSaga, 'var a = b\nlet e = f']}>
      <FileButton onChange={this.onChange}>
        <img src={upload} />
        Send file
      </FileButton>
      <img src={this.props.fileURL} width="300" />
    </Example>;
  }
}

Storage.propTypes = {};

const mapStateToProps = state => ({
  file: state.storage.file,
  fileURL: state.storage.url,
});
const mapDispatchToProps = {
  sendFile,
  setFile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Storage);
