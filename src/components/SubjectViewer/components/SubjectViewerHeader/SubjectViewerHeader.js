import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function InteractionLayer() {
  return (
    <Box background={{ color: 'white' }} round={{ size: 'xsmall', corner: 'top' }} pad='xsmall'>
      <Box direction='row' justify='between'>
        <Text>Original Subject</Text>
        <Box direction='row' gap='small'>
          <CapitalText>View All Lines</CapitalText>
        </Box>
      </Box>
    </Box>
  )
}

InteractionLayer.propTypes = {
}

export default InteractionLayer
