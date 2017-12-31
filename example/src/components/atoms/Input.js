import styled from 'styled-components'

export default styled.input`
  background: transparent;
  border: 2px solid ${p => p.theme.colour.primary};
  border-radius: 2px;
  box-sizing: border-box;
  color: white;
  font-size: inherit;
  height: ${p => 5 * p.theme.spacing}px;
  line-height: ${p => 5 * p.theme.spacing}px;
  padding: 0 ${p => 2 * p.theme.spacing}px;

  &::placeholder {
    color: ${p => p.theme.colour.disabled};
  }
`
