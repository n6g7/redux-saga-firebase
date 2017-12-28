import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import styled from 'styled-components'
import hljsStyle from './hljs-style'

const StyledExample = styled.article`
  background: ${p => p.theme.colour.example};
  color: white;
  padding: ${p => 4 * p.theme.spacing}px 0 0;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: normal;
  margin: 0 0 ${p => 3 * p.theme.spacing}px;
`

const Snippet = styled.aside`
  align-items: stretch;
  display: flex;
  flex-flow: row wrap;
  margin: ${p => 4 * p.theme.spacing}px 0 0;

  pre {
    border: 1px solid #18191E;
    border-width: ${p => p.theme.spacing / 4}px 1px ${p => p.theme.spacing / 4}px;
    flex-grow: 1;
    margin: 0;
    text-align: left;
    width: 30%;

    code {
      font-family: 'Source Code Pro', monospace;
    }
  }
`

class Example extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    snippets: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    snippets: []
  };

  render () {
    const {
      children,
      snippets,
      title,
      ...props
    } = this.props

    return <StyledExample {...props}>
      <Title>{ title }</Title>

      { children }

      { snippets.length > 0 &&
        <Snippet>
          {snippets.map((snippet, index) =>
            <SyntaxHighlighter language='javascript' style={hljsStyle} key={index}>
              { snippet }
            </SyntaxHighlighter>
          )}
        </Snippet>
      }
    </StyledExample>
  }
}

export default Example
