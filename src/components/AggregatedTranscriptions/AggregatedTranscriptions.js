import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import TranscriptionTable from './components/TranscriptionTable'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const OverflowBox = styled(Box)`
  overflow: auto;
  &::-webkit-scrollbar-thumb {
    background-color: #BABABA;
    border: 10px solid transparent;
    border-radius: 1em;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
  &::-webkit-scrollbar {
    background: white;
    width: 1.5em;
  }
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
        <Text size='large'>Transcribed Text</Text>
        <CapitalText size='large'>Add Line</CapitalText>
      </Box>
      <OverflowBox margin={{ right: '0.25em' }}>
        <TranscriptionTable />
      </OverflowBox>
    </Box>
  )
}


export default AggregatedTranscriptions
