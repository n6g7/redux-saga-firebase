import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Snippet } from '@atoms'

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

const Snippets = styled.figure`
  align-items: stretch;
  display: flex;
  flex-flow: row wrap;
  margin: ${p => 4 * p.theme.spacing}px 0 0;
`

const StyledSnippet = styled(Snippet)`
  flex-grow: 1;
  width: 30%;
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
        <Snippets>
          {snippets.map((snippet, index) =>
            <StyledSnippet key={index}>
              {snippet}
            </StyledSnippet>
          )}
        </Snippets>
      }
    </StyledExample>
  }
}

export default Example
