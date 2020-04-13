import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts'

export default (props) => (
  <Layout>
    <div dangerouslySetInnerHTML={{ __html: props.data.file.markdown.html }} />
  </Layout>
)

export const query = graphql`
  query {
    file(name: { eq: "index" }, sourceInstanceName: { eq: "pages" }) {
      markdown: childMarkdownRemark {
        html
      }
    }
  }
`
