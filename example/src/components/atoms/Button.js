import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { docs, github, loader } from '@assets'

const StyledButton = styled.button`
  align-items: center;
  background: ${p => p.theme.colour.primary};
  border: none;
  border-radius: ${p => p.theme.spacing / 4}px;
  color: white;
  cursor: pointer;
  display: inline-flex;
  flex-flow: row nowrap;
  font-size: inherit;
  font-weight: bold;
  height: ${p => 5 * p.theme.spacing}px;
  justify-content: center;
  line-height: ${p => 5 * p.theme.spacing}px;
  min-width: ${p => 15 * p.theme.spacing}px;
  outline: none;
  padding: 0 ${p => 2 * p.theme.spacing}px;
  position: relative;
  text-decoration: none;
  transition: .2s;

  img {
    height: ${p => 3 * p.theme.spacing}px;
    margin-right: ${p => p.theme.spacing}px;
  }

  ${p => p.disabled && `
    background: ${p.theme.colour.disabled};
    cursor: default;
  `}

  ${p => p.callToAction && `
    font-size: 20px;
    height: ${8 * p.theme.spacing}px;
    line-height: ${8 * p.theme.spacing}px;
    min-width: ${30 * p.theme.spacing}px;

    img {
      height: ${5 * p.theme.spacing}px;
      margin-right: ${2 * p.theme.spacing}px;
    }
  `}

  &:active {
    transform: translateY(${p => p.theme.spacing / 2}px);
  }

  ${p => p.loading && `
    padding-right: ${6 * p.theme.spacing}px;

    &::after {
      background: url(${loader}) 50% 50%;
      background-size: 90%;
      bottom: 0;
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: ${5 * p.theme.spacing}px;
    }
  `}
`
const StyledLink = StyledButton.withComponent('a')

class Button extends PureComponent {
  static propTypes = {
    callToAction: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired,
    link: PropTypes.string,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    callToAction: false,
    className: '',
    loading: false
  };

  render () {
    const {
      children,
      link,
      ...props
    } = this.props

    return link
      ? <StyledLink {...props} href={link} target='blank'>{ children }</StyledLink>
      : <StyledButton {...props}>{ children }</StyledButton>
  }
}

export default Button

class GitHubButton extends PureComponent {
  render () {
    return <Button link='https://github.com/n6g7/redux-saga-firebase' callToAction>
      <img src={github} />
      Source on GitHub
    </Button>
  }
}

class DocsButton extends PureComponent {
  render () {
    return <Button link='https://n6g7.github.io/redux-saga-firebase/' callToAction>
      <img src={docs} />
      Docs
    </Button>
  }
}

Button.Docs = DocsButton
Button.GitHub = GitHubButton
