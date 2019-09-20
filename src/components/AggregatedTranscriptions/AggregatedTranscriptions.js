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
  &::-webkit-scrollbar {
    border-radius: 0.5em;
  }
  &::-webkit-scrollbar {
    background: white;
    width: 1.5em;
  }
`

function AggregatedTranscriptions (props) {
  return (
    <Box background='white' height='large' round='xsmall' width='large'>
      <Box
        border={{ color: 'light-5', side: 'bottom' }}
        direction='row'
        justify='between'
        pad={{ horizontal: 'small', bottom: 'small', top: 'xsmall' }}
      >
        <Text>Transcribed Text</Text>
        <CapitalText>Add Line</CapitalText>
      </Box>
      <OverflowBox margin={{ right: '0.25em' }}>
        <TranscriptionTable />
      </OverflowBox>
    </Box>
  )
}


export default AggregatedTranscriptions
