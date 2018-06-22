import React from 'react'
import { Button, Container } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin: 3rem 0;
`

const Footer = ({ path, site }) => {
  return <StyledContainer as='footer' textAlign='center'>
    <Button
      basic
      as='a'
      href={`${site.github.url}/tree/master/${path}`}
      target='blank'
    >
      Edit on GitHub
    </Button>
  </StyledContainer>
}

export default Footer
