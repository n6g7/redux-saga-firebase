import React from 'react'
import { graphql } from 'gatsby'
import { Header } from 'semantic-ui-react'

import Layout from './index'
import { Footer } from '../components'

const Guide = ({ data }) => {
  const {
    file: {
      base,
      markdown: { frontmatter, html },
      sourceInstanceName,
    },
    site: { siteMetadata: site },
  } = data

  return (
    <Layout>
      <Header as="h1">{frontmatter.title}</Header>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <Footer site={site} path={`${site.docsDirectory}/${sourceInstanceName}/${base}`} />
    </Layout>
  )
}

export default Guide

export const query = graphql`
  query($fileName: String!) {
    site {
      siteMetadata {
        docsDirectory
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
