import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  sendFile,
  setFile,
} from '../../redux/reducer/storage.actions';

import Example from './Example';
import { Button, FileButton } from '../common';

import upload from '../../images/upload.svg';

import './Storage.styl';

import extractLines from '../../extract';
import storageSaga from '!raw-loader!../../redux/sagas/storage.js';

const doc = extractLines(storageSaga);

class Storage extends PureComponent {
  static propTypes = {
    file: PropTypes.instanceOf(File),
    loading: PropTypes.bool.isRequired,
    fileURL: PropTypes.string,
  };

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
    return <Example
      title="Storage"
      className="storage"
      snippets={[
        doc(19, 32),
        doc(9, 17),
      ]}
    >
      <FileButton onChange={this.onChange} loading={this.props.loading}>
        <img src={upload} />
        Send file
      </FileButton>
      <img src={this.props.fileURL} width="300" />
    </Example>;
  }
}

const mapStateToProps = state => ({
  file: state.storage.file,
  loading: state.storage.loading,
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
