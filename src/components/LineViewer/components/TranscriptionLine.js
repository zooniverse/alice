import React from 'react'
import { Box, CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import withThemeContext from '../../../helpers/withThemeContext'
import theme from './theme'
import indexToColor from '../../../helpers/indexToColor'

const ItalicText = styled(Text)`
  font-style: italic;
`

function TranscriptionLine ({ transcription, index }) {
  return (
    <Box height={{ min: '3em' }} margin={{ vertical: '0.25em' }}>
      <Box direction='row' justify='between'>
        <Box direction='row'>
          <Box align='end' background={indexToColor(index)} height='fit-content' width='2.5em'>
            <Box pad='0.2em'>
              <CheckBox />
            </Box>
          </Box>
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
        <ItalicText>{transcription.userName}</ItalicText>
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
  transcription: null,
  index: 0
}

TranscriptionLine.propTypes = {
  transcription: PropTypes.shape({
    date: PropTypes.string,
    goldStandard: PropTypes.bool,
    text: PropTypes.string,
    userName: PropTypes.string
  }),
  index: PropTypes.number
}

export default withThemeContext(TranscriptionLine, theme)
