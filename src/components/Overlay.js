import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

const StyledOverlay = styled(Box)`
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0.5;
  background: inherit;
`

export default function Overlay() {
  return <StyledOverlay fill round='xsmall'/>
}
