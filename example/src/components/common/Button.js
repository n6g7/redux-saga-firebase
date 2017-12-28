import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { docs, gh } from '@assets'
import './Button.styl'

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
      callToAction,
      children,
      link,
      loading,
      ...props
    } = this.props

    const classes = props.className.split(' ')

    if (loading) classes.push('loading')
    if (callToAction) classes.push('call-to-action')
    if (link) {
      classes.push('btn')
      props.href = link
      props.target = 'blank'
    }

    props.className = classes.join(' ')

    return link
      ? <a {...props}>{ children }</a>
      : <button {...props}>{ children }</button>
  }
}

export default Button

class GitHubButton extends PureComponent {
  render () {
    return <Button link='https://github.com/n6g7/redux-saga-firebase' callToAction>
      <img src={gh} />
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
