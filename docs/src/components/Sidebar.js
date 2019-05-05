import React, { PureComponent } from 'react'
import { Dropdown, Grid, Header, Icon, Image, List, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import { github, npm } from '../assets'

import MenuLink from './MenuLink'

const StyledImage = styled(Image)`
  height: 1em;
`

class Sidebar extends PureComponent {
  state = {
    version: 'dev',
  }

  activeTest(location, path) {
    return location.pathname.startsWith(path)
  }

  changeVersion = (event, { value }) => {
    this.setState({ version: value })
  }

  render() {
    const { guides, location, references, site, versions } = this.props
    const { version } = this.state

    const links = [
      {
        name: site.github.package,
        url: site.github.url,
        image: github,
      },
      {
        name: site.npm.package,
        url: site.npm.url,
        image: npm,
      },
    ]

    return (
      <Grid.Column width={4}>
        <div id="sidebar">
          <Header as="h1">{site.title}</Header>

          <p>
            A <a href="https://github.com/redux-saga/redux-saga/">redux-saga</a>{' '}
            integration for <a href="https://firebase.google.com/">firebase</a>.
          </p>

          <List>
            {links.map((link, i) => (
              <List.Item key={i}>
                <StyledImage src={link.image} verticalAlign="middle" />
                <List.Content verticalAlign="middle">
                  <a href={link.url} target="blank">
                    {link.name}
                  </a>
                </List.Content>
              </List.Item>
            ))}
          </List>

          <Menu fluid vertical pointing>
            <Menu.Item
              color="red"
              active={this.activeTest(location, '/guides') || location.pathname === '/'}
            >
              <Menu.Header>Guides</Menu.Header>

              <Menu.Menu>
                <MenuLink to="/" strict>
                  Getting started
                </MenuLink>

                {guides.map(({ node: guide }, i) => (
                  <MenuLink to={`/guides/${guide.parent.name}`}>
                    {guide.frontmatter.title}
                  </MenuLink>
                ))}

                <Menu.Item
                  color="red"
                  as="a"
                  href="https://github.com/n6g7/redux-saga-firebase/releases"
                  target="blank"
                >
                  <Icon name="external" />
                  Release notes
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item color="red" active={this.activeTest(location, '/reference')}>
              <Menu.Header>Reference</Menu.Header>

              <Menu.Menu>
                {references
                  .filter(({ node }) => node.parent.relativeDirectory === version)
                  .map(({ node: reference }, i) => (
                    <MenuLink to={`/reference/${version}/${reference.parent.name}`}>
                      {reference.frontmatter.title}
                    </MenuLink>
                  ))}
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item color="red">
              <Menu.Header>Examples</Menu.Header>

              <Menu.Menu>
                <Menu.Item
                  color="red"
                  as="a"
                  href="https://redux-saga-firebase.firebaseapp.com/"
                  target="blank"
                >
                  <Icon name="external" />
                  Web example site
                </Menu.Item>
                <Menu.Item
                  color="red"
                  as="a"
                  href="https://github.com/n6g7/redux-saga-firebase/tree/master/example"
                  target="blank"
                >
                  <Icon name="external" />
                  Web example code
                </Menu.Item>
                <Menu.Item
                  color="red"
                  as="a"
                  href="https://github.com/n6g7/cat/tree/master/rn"
                  target="blank"
                >
                  <Icon name="external" />
                  React Native example code
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              Documentation version:{' '}
              <Dropdown
                placeholder="Version"
                inline
                options={versions.map(v => ({
                  text: v.node.version,
                  value: v.node.tag,
                }))}
                value={version}
                onChange={this.changeVersion}
                scrolling
              />
            </Menu.Item>
          </Menu>

          <p>
            <a
              className="github-button"
              href="https://github.com/n6g7/redux-saga-firebase"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star n6g7/redux-saga-firebase on GitHub"
            >
              Star
            </a>
            <br />
            <Image
              as="a"
              href="https://circleci.com/gh/n6g7/redux-saga-firebase"
              src="https://circleci.com/gh/n6g7/redux-saga-firebase.svg?style=svg"
              alt="CircleCI"
            />
            <br />
            <Image
              as="a"
              href="https://badge.fury.io/js/redux-saga-firebase"
              src="https://badge.fury.io/js/redux-saga-firebase.svg"
              alt="npm version"
            />
            <br />
            <Image
              as="a"
              href="https://coveralls.io/github/n6g7/redux-saga-firebase?branch=master"
              src="https://coveralls.io/repos/github/n6g7/redux-saga-firebase/badge.svg?branch=master"
              alt="Coverage Status"
            />
            <br />
            <Image
              as="a"
              href="https://snyk.io/test/github/n6g7/redux-saga-firebase"
              src="https://snyk.io/test/github/n6g7/redux-saga-firebase/badge.svg"
              alt="Known Vulnerabilities"
              data-canonical-src="https://snyk.io/test/github/n6g7/redux-saga-firebase"
            />
          </p>
        </div>
      </Grid.Column>
    )
  }
}

export default Sidebar
