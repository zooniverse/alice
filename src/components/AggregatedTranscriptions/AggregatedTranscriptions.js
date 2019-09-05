import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import TranscriptionTable from './components/TranscriptionTable'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const OverflowBox = styled(Box)`
  overflow: auto;
`

function AggregatedTranscriptions (props) {
  return (
    <Box background='white' height='large' round='xxsmall' width='large'>
      <Box
        border={{ color: 'light-5', side: 'bottom' }}
        direction='row'
        justify='between'
        pad='small'
      >
        <Text>Transcribed Text</Text>
        <CapitalText>Add Line</CapitalText>
      </Box>
      <OverflowBox>
        <TranscriptionTable />
      </OverflowBox>
    </Box>
  )
}


export default AggregatedTranscriptions
