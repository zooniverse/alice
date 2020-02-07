import React from 'react'
import { Box, CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import indexToColor from '../../../helpers/indexToColor'

const ItalicText = styled(Text)`
  font-style: italic;
`

const StyledBox = styled(Box)`
  flex: 0 0 auto;
`

function TranscriptionLine ({ selectedItem, setItem, transcription, index }) {
  return (
    <Box height={{ min: '2em' }}>
      <Box direction='row' justify='between'>
        <Box direction='row'>
          <StyledBox
            align='end'
            background={indexToColor(index)}
            height='fit-content'
            pad='0.15em'
            width='1.75em'
          >
              <CheckBox
                checked={selectedItem === index}
                onChange={() => {
                  const setTo = selectedItem === index ? null : index
                  setItem(setTo)
                }}
              />
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
      <Box direction='row' margin={{ left: '4em' }}>
        <ItalicText>{transcription.date}</ItalicText>
        <Text margin={{ horizontal: 'xsmall' }}>&#8226;</Text>
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
  selectedItem: null,
  setItem: () => {},
  transcription: {
    date: '',
    goldStandard: false,
    text: '',
    userName: ''
  },
  index: 0
}

TranscriptionLine.propTypes = {
  selectedItem: PropTypes.number,
  setItem: PropTypes.func,
  transcription: PropTypes.shape({
    date: PropTypes.string,
    goldStandard: PropTypes.bool,
    text: PropTypes.string,
    userName: PropTypes.string
  }),
  index: PropTypes.number
}

export { ItalicText }
export default observer(TranscriptionLine)
