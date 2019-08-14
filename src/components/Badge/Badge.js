import React from 'react'
import { Box, Image, Text } from 'grommet'
import DefaultAvatar from '../../images/simple-avatar.png'
import styled from 'styled-components'

const StyledAvatar = styled.img`
  border-radius: 100%;
  height: 3em;
  width: auto;
  margin: 0 1em;
  object-fit: cover;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function Badge (props) {
  return (
    <Box direction='row' width='14em'>
      <StyledAvatar fit='contain' src={DefaultAvatar}/>
      <Box fill='horizontal' justify='center'>
        <Text size='medium'>Erin Green</Text>
        <CapitalText color='medGray' size='small'>Project Owner</CapitalText>
      </Box>
    </Box>
  )
}


export default Badge
