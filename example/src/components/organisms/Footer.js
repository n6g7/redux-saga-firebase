import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { Button } from '@atoms'
import { Container } from './Header'

const StyledFooter = Container.withComponent('footer')

const Disclaimer = styled.p`
  margin: ${p => 3 * p.theme.spacing}px 0;
`

class Footer extends PureComponent {
  static propTypes = {}

  render () {
    return <StyledFooter>
      <nav>
        <Button.GitHub />
        <Button.Docs />
      </nav>

      <Disclaimer>The content of this site is reset every 3 hours.</Disclaimer>
    </StyledFooter>
  }
}

export default Footer
