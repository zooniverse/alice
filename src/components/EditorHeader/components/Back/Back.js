import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'grommet'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function Back() {
  return (
    <StyledLink to='/projects'>
      <CapitalText color='#5C5C5C'>Back to Viewer/Editor</CapitalText>
    </StyledLink>
  )
}
