import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Prism from 'prismjs'

const Pre = styled.pre`
  &, &[class*=language-] {
    background: rgb(40, 44, 52);
    border: 1px solid #18191E;
    border-radius: 0;
    border-width: ${p => p.theme.spacing / 4}px 1px ${p => p.theme.spacing / 4}px;
    padding: 0.5em;
  }
`

const Code = styled.code`
  &, &[class*=language-] {
    font-family: 'Source Code Pro', monospace;
  }
`

class Snippet extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }

  static defaultProps = {
    language: 'javascript'
  }

  render () {
    const {
      children,
      language,
      ...props
    } = this.props

    const html = Prism.highlight(children, Prism.languages.javascript)

    return <Pre {...props}>
      <Code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{__html: html}}
      />
    </Pre>
  }
}

export default Snippet
