import React from 'react'
import { Header } from 'semantic-ui-react'

import { Footer } from '../components'

const Guide = ({ data }) => {
  const {
    file: {
      base,
      markdown: { frontmatter, html },
      sourceInstanceName
    },
    site: { siteMetadata: site }
  } = data

  return <div>
    <Header as='h1'>{ frontmatter.title }</Header>

    <div dangerouslySetInnerHTML={{ __html: html }} />

    <Footer
      site={site}
      path={`${site.docsDirectory}/${sourceInstanceName}/${base}`}
    />
  </div>
}

export default Guide

export const pageQuery = graphql`
  query GuideByPath($fileName: String!) {
    site {
      siteMetadata {
        docsDirectory,
        github {
          url
        }
      }
    }
    file(name: { eq: $fileName }) {
      base
      sourceInstanceName
      markdown: childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`
