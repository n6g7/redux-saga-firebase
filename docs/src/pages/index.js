import React from 'react'

export default props => (
  <div dangerouslySetInnerHTML={{ __html: props.data.file.markdown.html }} />
)

export const query = graphql`
  query IndexQuery {
    file(name: { eq: "index" }, sourceInstanceName: { eq: "pages" }) {
      markdown: childMarkdownRemark {
        html
      }
    }
  }
`
