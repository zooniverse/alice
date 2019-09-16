import React from 'react'
import { Box, CheckBox, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ItalicText = styled(Text)`
  font-style: italic;
`

function TranscriptionLine ({ classification }) {
  return (
    <Box margin={{ vertical: '0.25em' }}>
      <Box direction='row'>
        <Box align='end' background='red' height='1.4em' width='2.5em'>
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
      <Box direction='row' margin={{ left: '4em' }}>
        <ItalicText>{classification.date} &#8226; {classification.userName}</ItalicText>
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

export default TranscriptionLine
