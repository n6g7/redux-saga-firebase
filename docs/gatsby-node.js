const path = require('path')

const createPagesBuilder = (sourceInstanceName, templatePath) => ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const template = path.resolve(templatePath)

  return graphql(`
    {
      files: allFile(
        filter: { sourceInstanceName: { eq: "${sourceInstanceName}" }}
      ) {
        edges {
          node {
            name
            relativeDirectory
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) return Promise.reject(result.errors)

    result.data.files.edges.forEach(({ node }) => {
      createPage({
        path: node.relativeDirectory
          ? `/${sourceInstanceName}/${node.relativeDirectory}/${node.name}`
          : `/${sourceInstanceName}/${node.name}`,
        component: template,
        context: {
          fileName: node.name
        }
      })
    })
  })
}

exports.createPages = args => {
  createPagesBuilder('guides', 'src/layouts/Guide.js')(args)
  createPagesBuilder('reference', 'src/layouts/Reference.js')(args)
}
