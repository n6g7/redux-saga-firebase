import styled from 'styled-components'

export default styled.a`
  &,
  &:hover,
  &:visited {
    border-bottom: 1px solid ${p => p.theme.colour.primary};
    color: ${p => p.theme.colour.primary};
    font-weight: bold;
    text-decoration: none;

    &.btn {
      border: none;
      color: white;
    }
  }
`
