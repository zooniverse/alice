import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'grommet'
import AppContext from 'store'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

export default function Back() {
  const store = React.useContext(AppContext)
  const link = store.auth.user ? '/projects' : '/'

  return (
    <StyledLink to={link}>
      <CapitalText color='#5C5C5C'>Back to Viewer/Editor</CapitalText>
    </StyledLink>
  )
}
