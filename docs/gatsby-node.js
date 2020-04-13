const crypto = require('crypto')
const path = require('path')

const createPagesBuilder = (sourceInstanceName, templatePath) => ({
  actions,
  graphql,
}) => {
  const { createPage } = actions
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
  `).then((result) => {
    if (result.errors) return Promise.reject(result.errors)

    result.data.files.edges.forEach(({ node }) => {
      createPage({
        path: node.relativeDirectory
          ? `/${sourceInstanceName}/${node.relativeDirectory}/${node.name}`
          : `/${sourceInstanceName}/${node.name}`,
        component: template,
        context: {
          fileName: node.name,
          version: node.relativeDirectory,
        },
      })
    })
  })
}

exports.createPages = async (args) => {
  await createPagesBuilder('guides', 'src/layouts/guide.js')(args)
  await createPagesBuilder('reference', 'src/layouts/reference.js')(args)
}

const versions = []
const base = 1e3

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions

  if (
    node.internal.type === 'File' &&
    node.sourceInstanceName === 'reference' &&
    !versions.includes(node.relativeDirectory)
  ) {
    const tag = node.relativeDirectory
    const match = /^v((\d+)\.(\d+)\.(\d+))$/.exec(tag)
    const version = match ? match[1] : tag
    const num = match
      ? parseInt(match[2]) * base ** 2 + parseInt(match[3]) * base + parseInt(match[4])
      : Infinity

    versions.push(tag)

    createNode({
      id: `Version ${tag}`,
      parent: node.id,
      internal: {
        type: 'version',
        contentDigest: crypto.createHash('md5').update(JSON.stringify(tag)).digest('hex'),
      },
      children: [],
      tag,
      version,
      num,
    })
  }
}
