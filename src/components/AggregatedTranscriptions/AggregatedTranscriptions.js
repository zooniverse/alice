import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function AggregatedTranscriptions (props) {
  return (
    <Box background='white' height='large' round='xxsmall' width='medium'>
      <Box
        border={{ color: 'light-5', side: 'bottom' }}
        direction='row'
        justify='between'
        pad='small'
      >
        <Text>Transcribed Text</Text>
        <CapitalText>Add Line</CapitalText>
      </Box>
      <Box>

      </Box>
    </Box>
  )
}


export default AggregatedTranscriptions
