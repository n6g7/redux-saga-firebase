import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  sendFile,
  setFile
} from '../../redux/reducer/storage.actions'

import { Example, FileButton } from '@molecules'

import { upload } from '@assets'

import './Storage.styl'

import extractLines from '../../extract'
import storageSaga from '../../redux/sagas/storage.js?raw'

const doc = extractLines(storageSaga)

class Storage extends PureComponent {
  static propTypes = {
    file: PropTypes.instanceOf(window.File),
    loading: PropTypes.bool.isRequired,
    fileURL: PropTypes.string
  };

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    const file = event.target.files[0]
    this.props.setFile(file)
    this.props.sendFile()
  }

  render () {
    return <Example
      title='Storage'
      className='storage'
      snippets={[
        doc(18, 32),
        doc(9, 17)
      ]}
    >
      <FileButton onChange={this.onChange} loading={this.props.loading}>
        <img src={upload} />
        Send file
      </FileButton>
      <img src={this.props.fileURL} width='300' />
    </Example>
  }
}

const mapStateToProps = state => ({
  file: state.storage.file,
  loading: state.storage.loading,
  fileURL: state.storage.url
})
const mapDispatchToProps = {
  sendFile,
  setFile
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Storage)
