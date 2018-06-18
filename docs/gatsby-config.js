module.exports = {
  pathPrefix: '/redux-saga-firebase',
  siteMetadata: {
    title: 'Redux Saga Firebase',
    docsDirectory: 'docs',
    github: {
      package: 'n6g7 / redux-saga-firebase',
      url: 'https://github.com/n6g7/redux-saga-firebase'
    },
    npm: {
      package: 'redux-saga-firebase',
      url: 'https://www.npmjs.com/package/redux-saga-firebase'
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/guides`,
        name: 'guides'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/reference`,
        name: 'reference'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-'
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-62266834-3'
      }
    }
  ]
}
