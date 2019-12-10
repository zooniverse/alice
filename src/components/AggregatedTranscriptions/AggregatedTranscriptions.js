import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { bool } from 'prop-types'
import Overlay from '../Overlay'
import TranscriptionTable from './components/TranscriptionTable'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledBox = styled(Box)`
  position: relative;
`

const OverflowBox = styled(Box)`
  overflow: auto;
  &::-webkit-scrollbar-thumb {
    background-color: #BABABA;
    border: 5px solid transparent;
    border-radius: 1em;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    border-radius: 0.5em;
  }
  &::-webkit-scrollbar {
    background: white;
    width: 0.9em;
  }
`

function AggregatedTranscriptions ({ showOverlay }) {
  return (
    <StyledBox background='white' height='large' round='xsmall'>
      <Box
        border={{ color: 'light-5', side: 'bottom' }}
        direction='row'
        justify='between'
        pad={{ horizontal: 'small', bottom: 'small', top: 'xsmall' }}
      >
        <Text>Transcribed Text</Text>
        <CapitalText>Add Line</CapitalText>
      </Box>
      <OverflowBox>
        <TranscriptionTable />
      </OverflowBox>
      {showOverlay && <Overlay />}
    </StyledBox>
  )
}

AggregatedTranscriptions.propTypes = {
  showOverlay: bool
}

AggregatedTranscriptions.defaultProps = {
  showOverlay: false
}

export default AggregatedTranscriptions
