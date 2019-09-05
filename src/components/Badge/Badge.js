import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import DefaultAvatar from '../../images/simple-avatar.png'
import { FormDown } from 'grommet-icons'

const StyledAvatar = styled.img`
  border-radius: 100%;
  height: 2.5em;
  width: auto;
  margin: 0 0.5em 0 1em;
  object-fit: cover;
`

const CapitalText = styled(Text)`
  line-height: 10px;
  text-transform: uppercase;
`

function Badge (props) {
  return (
    <Box align='center' direction='row' height='xxsmall' width='14em'>
      <StyledAvatar fallback={DefaultAvatar} src={DefaultAvatar} />
      <Box>
        <Text>Erin Green</Text>
        <CapitalText color='dark-5' size='xsmall'>Project Owner</CapitalText>
      </Box>
      <FormDown />
    </Box>
  )
}


export default Badge
