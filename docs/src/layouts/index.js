import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Container, Grid } from 'semantic-ui-react'

import { Sidebar } from '../components'
import './index.css'

const BaseLayout = ({ children, data, location }) => {
  return <Container>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    >
      <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css' />
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.11.0/themes/prism.css' />
      <script async defer src='https://buttons.github.io/buttons.js' />
    </Helmet>

    <Grid>
      <Sidebar
        location={location}
        site={data.site.siteMetadata}
        guides={data.guides.edges}
        references={data.references.edges}
      />
      <Grid.Column width={12}>
        {children()}
      </Grid.Column>
    </Grid>
  </Container>
}

BaseLayout.propTypes = {
  children: PropTypes.func
}

export default BaseLayout

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title,
        github {
          package,
          url
        }
        npm {
          package,
          url
        }
      }
    }

    guides: allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "guide" }}}
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          ...fileData
        }
      }
    }

    references: allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "docs" }}}
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          ...fileData
        }
      }
    }
  }

  fragment fileData on MarkdownRemark {
    frontmatter {
      title
    }
    parent {
      ... on File {
        name
        relativeDirectory
      }
    }
  }
`
