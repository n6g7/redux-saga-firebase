import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import hljsStyle from './hljs-style';

import './Example.styl';

class Example extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    snippets: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    snippets: [],
  };

  render() {
    const {
      children,
      snippets,
      title,
      ...props,
    } = this.props;

    return <article {...props}>
      <h2>{ title }</h2>

      { children }

      { snippets.length > 0 &&
        <aside>
          {snippets.map((snippet, index) =>
            <SyntaxHighlighter language="javascript" style={hljsStyle} key={index}>
              { snippet }
            </SyntaxHighlighter>
          )}
        </aside>
      }
    </article>;
  }
}

export default Example;
