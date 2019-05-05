import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import remark from 'remark'
import remarkReact from 'remark-react'
import Prism from 'prismjs'

const parser = remark().use(remarkReact)
const md = str => parser.processSync(str).contents

class Markdown extends PureComponent {
  componentDidMount() {
    const { lang } = this.props
    if (lang) Prism.highlightElement(this.codeElement)
  }

  render() {
    const { children, lang } = this.props
    const markdownElement = md(children)

    if (!lang) return markdownElement

    return React.cloneElement(markdownElement, {
      className: 'language-javascript',
      ref: ref => {
        this.codeElement = ref ? ref.querySelector('code') : ref
      },
    })
  }
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
  lang: PropTypes.string,
}

export default Markdown
