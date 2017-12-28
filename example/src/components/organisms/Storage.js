import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  sendFile,
  setFile
} from '@actions/storage'

import { Example, FileButton } from '@molecules'

import { upload } from '@assets'

import extractLines from '../../extract'
import storageSaga from '../../redux/sagas/storage.js?raw'

const StyledFileButton = styled(FileButton)`
  margin-bottom: ${p => 2 * p.theme.spacing}px;
`

const Image = styled.img`
  height: ${p => 40 * p.theme.spacing}px;
  object-fit: contain;
  width: ${p => 60 * p.theme.spacing}px;
`

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
      <StyledFileButton onChange={this.onChange} loading={this.props.loading}>
        <img src={upload} />
        Send file
      </StyledFileButton>
      <Image src={this.props.fileURL} width='300' />
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
