import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { bool, shape} from 'prop-types'
import Overlay from '../Overlay'
import TranscriptionTable from './components/TranscriptionTable'
import LineViewer from '../LineViewer'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledBox = styled(Box)`
  position: relative;
`

const AbsoluteBox = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  width: auto;
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

function AggregatedTranscriptions ({ margin, showOverlay, showTranscription }) {
  return (
    <StyledBox height='large'>
      <Box background='white' fill='vertical' margin={margin} round='xsmall'>
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
        {(showOverlay || showTranscription) && (
          <AbsoluteBox background={{ color: 'white', opacity: 'medium' }} fill margin={margin} opacity='0.5' round='xsmall'>
            <Overlay />
          </AbsoluteBox>
        )}
      </Box>
      {showTranscription && (
        <AbsoluteBox align='center' background='transparent' pad={{ right: 'small' }} fill justify='center'>
          <LineViewer />
        </AbsoluteBox>
      )}
    </StyledBox>
  )
}

AggregatedTranscriptions.propTypes = {
  margin: shape(),
  showOverlay: bool,
  showTranscription: bool
}

AggregatedTranscriptions.defaultProps = {
  margin: {},
  showOverlay: false,
  showTranscription: false
}

export default AggregatedTranscriptions
