import React, { PureComponent } from 'react';

import gh from '../../images/github.svg';
import './Button.styl';

class Button extends PureComponent {
  render() {
    const {
      callToAction,
      children,
      link,
      ...props,
    } = this.props;

    const classes = props.className.split(' ');

    if (callToAction) props.className = classes.push('call-to-action');
    if (link) {
      classes.push('btn');
      props.href = link;
      props.target = 'blank'
    }

    props.className = classes.join(' ');

    return link
      ? <a {...props}>{ children }</a>
      : <button {...props}>{ children }</button>;
  }
}

Button.propTypes = {
  callToAction: React.PropTypes.bool.isRequired,
  children: React.PropTypes.any.isRequired,
  link: React.PropTypes.string,
};

Button.defaultProps = {
  callToAction: false,
  className: '',
};

export default Button;

class GitHubButton extends PureComponent {
  render() {
    return <Button link="https://github.com/n6g7/redux-saga-firebase" callToAction>
      <img src={gh}/>
      Read the docs
    </Button>;
  }
}

Button.GitHub = GitHubButton;
