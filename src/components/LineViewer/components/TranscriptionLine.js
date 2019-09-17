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

function TranscriptionLine ({ classification, index }) {
  return (
    <Box margin={{ vertical: '0.25em' }}>
      <Box direction='row' justify='between'>
        <Box direction='row'>
          <Box align='end' background={indexToColor(index)} width='2.5em'>
            <Box pad='0.2em'>
              <CheckBox />
            </Box>
          </Box>
          <Text
            alignSelf='center'
            margin={{ horizontal: 'xsmall' }}
            weight='bold'
          >
            {classification.text}
          </Text>
        </Box>
        {classification.goldStandard && (
          <Box alignSelf='center' margin={{ horizontal: 'xsmall' }}>
            <FontAwesomeIcon color='gold' icon={faStar} size='xs' />
          </Box>
        )}
      </Box>
      <Box direction='row' margin={{ left: '4em' }}>
        <ItalicText>{classification.date}</ItalicText>
        <Text margin={{ horizontal: 'xsmall' }}>&#8226;</Text>
        <ItalicText>{classification.userName}</ItalicText>
        {classification.goldStandard && (
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
  classification: null,
  index: 0
}

TranscriptionLine.propTypes = {
  classification: PropTypes.shape({
    date: PropTypes.string,
    goldStandard: PropTypes.bool,
    text: PropTypes.string,
    userName: PropTypes.string
  }),
  index: PropTypes.number
}

export default withThemeContext(TranscriptionLine, theme)
