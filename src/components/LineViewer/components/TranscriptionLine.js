import React from 'react'
import { Box, CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import writeDate from 'helpers/writeDate'
import indexToColor from '../../../helpers/indexToColor'

const ItalicText = styled(Text)`
  font-style: italic;
`

const StyledBox = styled(Box)`
  flex: 0 0 auto;
`

function TranscriptionLine ({ isViewer, selectedItem, setItem, transcription, index }) {
  const timeString = transcription.time && transcription.time.toLocaleTimeString([], { hour: '2-digit', hour12: false, minute: '2-digit' });
  return (
    <Box height={{ min: '2em' }}>
      <Box direction='row' justify='between'>
        <Box direction='row'>
          <StyledBox
            align='end'
            background={indexToColor(index)}
            height={{ min: '0.75em' }}
            pad='0.15em'
            width='1.75em'
          >
            {!isViewer && (
              <CheckBox
                checked={selectedItem === index}
                onChange={() => {
                  const setTo = selectedItem === index ? null : index
                  setItem(setTo)
                }}
              />
            )}
          </StyledBox>
          <Text
            alignSelf='center'
            margin={{ horizontal: 'xsmall' }}
          >
            {transcription.text}
          </Text>
        </Box>
        {transcription.goldStandard && (
          <Box alignSelf='center' margin={{ horizontal: 'xsmall' }}>
            <FontAwesomeIcon color='gold' icon={faStar} size='xs' />
          </Box>
        )}
      </Box>
      <Box direction='row' gap='xsmall' margin={{ left: '3em' }}>
        <ItalicText>{writeDate(transcription.time)}</ItalicText>
        <Text>&#8226;</Text>
        <ItalicText>{timeString}</ItalicText>
        <Text>&#8226;</Text>
        <ItalicText size='xsmall'>{transcription.userName}</ItalicText>
        {transcription.goldStandard && (
          <Box direction='row'>
            <Text margin={{ horizontal: 'xsmall' }}>&#8226;</Text>
            <ItalicText>Gold Standard</ItalicText>
          </Box>
        )}
      </Box>
    </Box>
  )
}

TranscriptionLine.defaultProps = {
  isViewer: false,
  selectedItem: null,
  setItem: () => {},
  transcription: {
    goldStandard: false,
    time: null,
    text: '',
    userName: null
  },
  index: 0
}

TranscriptionLine.propTypes = {
  isViewer: PropTypes.bool,
  selectedItem: PropTypes.number,
  setItem: PropTypes.func,
  transcription: PropTypes.shape({
    goldStandard: PropTypes.bool,
    time: PropTypes.shape(),
    text: PropTypes.string,
    userName: PropTypes.number
  }),
  index: PropTypes.number
}

export { ItalicText }
export default observer(TranscriptionLine)
