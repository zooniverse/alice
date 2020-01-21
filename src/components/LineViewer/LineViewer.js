import React from 'react'
import { Box, Button, CheckBox, Text, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import TranscriptionLine from './components/TranscriptionLine'
import withThemeContext from '../../helpers/withThemeContext'
import FlagButtonContainer from './components/FlagButtons/FlagButtonContainer'
import SeenButtonContainer from './components/FlagButtons/SeenButtonContainer'
import theme from './theme'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ItalicText = styled(Text)`
  font-style: italic;
`

function LineViewer ({
  closeModal,
  consensusText,
  flagged,
  reduction,
  replaceWithSelected,
  selectedItem,
  seen,
  setItem,
  setTextOptions,
  textOptions,
  transcriptionOptions
}) {
  const textInputPos = transcriptionOptions.length + 1

  return (
    <Box background='white' elevation='small' round='xsmall' width='large'>
      <Box border='bottom' pad={{ top: 'xsmall', horizontal: 'xsmall' }}>
        <Box align='center' direction='row' justify='between'>
          <Box basis='80%'>
            <CapitalText size='0.6em' weight='bold'>Selected Transcription</CapitalText>
          </Box>
          <Box align='center' basis='20%' direction='row' gap='xsmall'>
            <CapitalText size='0.6em' weight='bold'>Flag</CapitalText>
            <CapitalText textAlign='end' size='0.6em' weight='bold'>Consensus Score</CapitalText>
          </Box>
        </Box>
        <Box align='center' direction='row' gap='xsmall' justify='between'>
          <Box fill='horizontal'>
            <Text weight='bold'>{consensusText}</Text>
          </Box>
          <Box direction='row' margin={{ bottom: '0.5em' }}>
            <SeenButtonContainer reduction={reduction} tag={seen} />
            <FlagButtonContainer reduction={reduction} tag={flagged} />
          </Box>
          <Box>
            {reduction.edited_consensus_text ? (
              <Text>Edited</Text>
            ) : (
              <Text>{parseFloat(reduction.consensus_score.toFixed(1))}/{reduction.number_views}</Text>
            )}
          </Box>
        </Box>
      </Box>
      <Box border='bottom'>
        <Box gap='xsmall' margin={{ vertical: 'xsmall' }} overflow='auto'>
          {transcriptionOptions.map((transcription, index) =>
            <TranscriptionLine
              transcription={transcription}
              index={index}
              key={`LINE_${index}`}
              selectedItem={selectedItem}
              setItem={setItem}
            />)}
        </Box>
        <Box border='top' gap='xsmall' margin={{ horizontal: 'small', bottom: 'xsmall' }} pad={{ top: 'xsmall' }}>
          <Box>
            <Box direction='row' gap='xsmall'>
              <CheckBox
                checked={selectedItem === transcriptionOptions.length}
                onChange={() => {
                  const setTo = selectedItem === transcriptionOptions.length ? null : transcriptionOptions.length
                  setItem(setTo)
                }}
              />
              <Text>{textOptions[transcriptionOptions.length]}</Text>
            </Box>
            <ItalicText margin={{ left: 'medium' }} size='xsmall'>aggregated transcription (via algorithm)</ItalicText>
          </Box>
          <Box direction='row' gap='xsmall'>
            <CheckBox
              checked={selectedItem === textInputPos}
              onChange={() => {
                const setTo = selectedItem === textInputPos ? null : textInputPos
                setItem(setTo)
              }}
            />
            <Box fill='horizontal'>
              <TextInput
                onChange={e => {
                  const textCopy = textOptions.slice()
                  textCopy[textInputPos] = e.target.value
                  setTextOptions(textCopy)
                }}
                placeholder='Write new...'
                size='xsmall'
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box direction='row' justify='between' margin={{ horizontal: 'xsmall', bottom: 'xsmall', top: '0.25em' }}>
        <Box direction='row'>
          <Button margin={{ right: 'small' }}><CapitalText size='xsmall'>Add Line Below</CapitalText></Button>
          <Button onClick={() => test()}><CapitalText size='xsmall'>Delete Line</CapitalText></Button>
        </Box>
        <Box direction='row' gap='small'>
          <Button disabled={selectedItem === null} onClick={replaceWithSelected}><CapitalText size='xsmall'>Replace With Selected</CapitalText></Button>
          <Button onClick={closeModal}><CapitalText size='xsmall'>Close</CapitalText></Button>
        </Box>
      </Box>
    </Box>
  )
}

LineViewer.defaultProps = {
  closeModal: () => {},
  consensusText: '',
  flagged: false,
  reduction: {},
  replaceWithSelected: () => {},
  seen: false,
  selectedItem: null,
  setItem: () => {}
}

LineViewer.propTypes = {
  closeModal: PropTypes.func,
  consensusText: PropTypes.string,
  flagged: PropTypes.bool,
  reduction: PropTypes.shape(),
  replaceWithSelected: PropTypes.func,
  seen: PropTypes.bool,
  selectedItem: PropTypes.number,
  setItem: PropTypes.func
}

export default observer(withThemeContext(LineViewer, theme))
