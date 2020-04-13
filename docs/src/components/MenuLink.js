import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Menu } from 'semantic-ui-react'

class MenuLink extends Component {
  render() {
    const { children, strict, to, ...rest } = this.props

    return (
      <Menu.Item
        color="red"
        as={Link}
        to={to}
        activeClassName="active"
        isActive={MenuLink.isActive(to, strict)}
        {...rest}
      >
        {children}
      </Menu.Item>
    )
  }
}

MenuLink.propTypes = {
  strict: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
}

MenuLink.defaultProps = {
  strict: false,
}

MenuLink.isActive = (path, strict = false) => {
  const check = strict
    ? (pathname) => pathname === path
    : (pathname) => pathname.startsWith(path)

  return (match, { pathname }) => check(pathname)
}

export default MenuLink
