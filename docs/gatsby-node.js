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
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) return Promise.reject(result.errors)

    result.data.files.edges.forEach(({ node }) => {
      createPage({
        path: `/${sourceInstanceName}/${node.name}`,
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
