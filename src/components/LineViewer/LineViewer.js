import React from 'react'
import { Box, Button, CheckBox, Text, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TranscriptionLine from './components/TranscriptionLine'
import withThemeContext from '../../helpers/withThemeContext'
import theme from './theme'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function LineViewer ({ aggregatedText, classifications, consensusScore }) {
  return (
    <Box background='white' round='xsmall' width='large'>
      <Box border='bottom' pad='xsmall'>
        <Box direction='row' justify='between'>
          <CapitalText size='xsmall'>Aggregated Transcription</CapitalText>
          <CapitalText size='xsmall'>Consensus Score</CapitalText>
        </Box>
        <Box direction='row' justify='between' pad={{ top: 'xsmall' }}>
          <Text weight='bold'>{aggregatedText}</Text>
          <Text>{consensusScore}/{classifications.length}</Text>
        </Box>
      </Box>
      <Box border='bottom' margin={{ top: 'xsmall' }}>
        {classifications.map((classification, index) => <TranscriptionLine classification={classification} index={index} key={`LINE_${index}`} />)}
        <Box direction='row' margin='xsmall'>
          <Box justify='center' margin={{ left: 'xsmall' }}>
            <CheckBox />
          </Box>
          <Box fill='horizontal' margin='xsmall'>
            <TextInput placeholder='Write new...' size='small' />
          </Box>
        </Box>
      </Box>
      <Box direction='row' justify='between' margin='xsmall'>
        <Box direction='row'>
          <Button margin={{ right: 'small' }}><CapitalText>Add Line Below</CapitalText></Button>
          <Button><CapitalText>Delete Line</CapitalText></Button>
        </Box>
        <Box direction='row'>
          <Button margin={{ right: 'small' }}><CapitalText>Replace With Selected</CapitalText></Button>
          <Button><CapitalText>Close</CapitalText></Button>
        </Box>
      </Box>
    </Box>
  )
}

LineViewer.defaultProps = {
  aggregatedText: 'Mauris elementum pulvinar lacinia. Donec tincidunt pretium quam, at condimentum ex lacinia eu.',
  classifications: [],
  consensusScore: 0
}

LineViewer.propTypes = {
  aggregatedText: PropTypes.string,
  classifications: PropTypes.array,
  consensusScore: PropTypes.number
}

export default withThemeContext(LineViewer, theme)
