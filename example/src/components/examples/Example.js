import React, { PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import hljsStyle from './hljs-style';

import './Example.styl';

class Example extends PureComponent {
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

Example.propTypes = {
  children: React.PropTypes.node.isRequired,
  snippets: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  title: React.PropTypes.string.isRequired,
};

Example.defaultProps = {
  snippets: [],
};

export default Example;
