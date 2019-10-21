import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import TranscriptionTable from './components/TranscriptionTable'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledBox = styled(Box)`
  opacity: ${props => props.opacity}
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

function AggregatedTranscriptions ({ disabled }) {
  const opacity = disabled ? '0.5' : '1'

  return (
    <StyledBox background='white' height='large' round='xsmall' opacity={opacity}>
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
    </StyledBox>
  )
}


export default AggregatedTranscriptions
