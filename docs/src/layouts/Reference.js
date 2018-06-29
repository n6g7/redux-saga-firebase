import React, { PureComponent } from 'react'
import {
  Divider,
  Header,
  Label,
  Table
} from 'semantic-ui-react'

import { Footer, Markdown } from '../components'

class Reference extends PureComponent {
  renderMethod (method) {
    const fragment = [
      <Divider />,
      <Header as='h2' id={method.id}>
        <code>{method.signature}</code>
        <Label small horizontal color={method.generator ? 'red' : 'teal'}>
          {method.generator ? 'Generator' : 'Function'}
        </Label>
      </Header>,
      <Markdown>{method.description}</Markdown>
    ]

    if (method.arguments) {
      fragment.push(
        <Header as='h3'>Arguments</Header>,
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {method.arguments.map(argument =>
              <Table.Row>
                <Table.Cell>
                  <code>{argument.name}</code>
                  {!argument.required &&
                    <Label basic grey size='tiny'>Optional</Label>
                  }
                </Table.Cell>
                <Table.Cell>
                  <Markdown>{argument.type}</Markdown>
                </Table.Cell>
                <Table.Cell>
                  <Markdown>{argument.description}</Markdown>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )
    }

    if (method.output) {
      fragment.push(
        <Header as='h3'>Output</Header>,
        <Markdown>{method.output}</Markdown>
      )
    }

    fragment.push(
      <Header as='h3'>Example</Header>,
      <Markdown lang='javascript'>{method.example}</Markdown>
    )

    return fragment
  }

  render () {
    const {
      file: {
        base,
        markdown: { frontmatter, html },
        relativeDirectory,
        sourceInstanceName
      },
      site: { siteMetadata: site }
    } = this.props.data

    return <div>
      <Header as='h1'>{ frontmatter.title }</Header>

      <nav>
        <ul>
          {frontmatter.methods.map(method =>
            <li key={method.id}>
              <a href={`#${method.id}`}><code>{ method.signature }</code></a>
            </li>
          )}
        </ul>
      </nav>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      {frontmatter.methods.map(this.renderMethod)}

      <Footer
        site={site}
        path={`${site.docsDirectory}/${sourceInstanceName}/${relativeDirectory}/${base}`}
      />
    </div>
  }
}

export default Reference

export const pageQuery = graphql`
  query ReferenceByPath($fileName: String!) {
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
      relativeDirectory
      sourceInstanceName
      markdown: childMarkdownRemark {
        html
        frontmatter {
          title
          methods {
            arguments {
              description
              name
              type
            }
            description
            example
            generator
            id
            output
            signature
          }
        }
      }
    }
  }
`
