import React from 'react'
import { Box, Button, CheckBox, Text, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { constructText } from 'helpers/parseTranscriptionData'
import TranscriptionLine from './components/TranscriptionLine'
import withThemeContext from '../../helpers/withThemeContext'
import theme from './theme'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
  opacity: 0.5;
`

function LineViewer ({ reduction, aggregatedText, classifications, closeModal, consensusScore }) {
  const textArray = constructText(reduction)
  const transcriptionArray = textArray.map((text, i) => {
    return {
      date: '',
      goldStandard: (reduction.gold_standard && reduction.gold_standard[i]) || false,
      userName: 'Anonymous',
      text
    }
  })

  return (
    <Box background='white' elevation='small' round='xsmall' width='large'>
      <Box border='bottom' pad='xsmall'>
        <Box direction='row' justify='between'>
          <CapitalText size='xsmall'>Aggregated Transcription</CapitalText>
          <CapitalText size='xsmall'>Consensus Score</CapitalText>
        </Box>
        <Box direction='row' justify='between' pad={{ top: 'xsmall' }}>
          <Text weight='bold'>{aggregatedText}</Text>
          <Box basis='15%' direction='row' align='center'>
            <StyledFontAwesomeIcon color='tomato' icon={faCircle} size='xs' />
            <StyledFontAwesomeIcon color='green' icon={faCircle} size='xs' />
          </Box>
          <Box basis='15%' justify='center'>
            <Text>{parseFloat(reduction.consensus_score.toFixed(1))}/{reduction.number_views}</Text>
          </Box>
        </Box>
      </Box>
      <Box border='bottom' margin={{ top: 'xsmall' }}>
        <Box overflow='auto'>
          {transcriptionArray.map((transcription, index) => <TranscriptionLine transcription={transcription} index={index} key={`LINE_${index}`} />)}
        </Box>
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
          <Button onClick={closeModal}><CapitalText>Close</CapitalText></Button>
        </Box>
      </Box>
    </Box>
  )
}

LineViewer.defaultProps = {
  aggregatedText: '',
  classifications: [],
  closeModal: () => {},
  consensusScore: 0
}

LineViewer.propTypes = {
  aggregatedText: PropTypes.string,
  classifications: PropTypes.array,
  closeModal: PropTypes.func,
  consensusScore: PropTypes.number
}

export default withThemeContext(LineViewer, theme)
