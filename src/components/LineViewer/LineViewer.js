import React from 'react'
import { Box, Button, CheckBox, Text, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import TranscriptionLine from './components/TranscriptionLine'
import withThemeContext from '../../helpers/withThemeContext'
import DeleteModal from './components/DeleteModal'
import FlagButtonContainer from './components/FlagButtons/FlagButtonContainer'
import SeenButtonContainer from './components/FlagButtons/SeenButtonContainer'
import theme from './theme'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const ItalicText = styled(Text)`
  font-style: italic;
`

const RelativeBox = styled(Box)`
  position: relative;
`

function LineViewer ({
  addLine,
  algorithmChoice,
  closeModal,
  consensusText,
  flagged,
  inputText,
  isViewer,
  reduction,
  selectedItem,
  seen,
  setInputText,
  setItem,
  transcriptionOptions,
  typedChoice,
  showDeleteModal,
  toggleDeleteModal
}) {
  const replaceWithSelected = () => {
    let originalTranscriber = ''
    let textOption = ''

    if (selectedItem === algorithmChoice) {
      textOption = reduction.consensus_text
    } else if (selectedItem === typedChoice) {
      textOption = inputText
    } else {
      originalTranscriber = transcriptionOptions[selectedItem].user
      textOption = transcriptionOptions[selectedItem].text
    }
    const isAlgorithmChoice = selectedItem === algorithmChoice
    reduction.setConsensusText(textOption, isAlgorithmChoice, originalTranscriber)
  }

  return (
    <RelativeBox background='white' elevation='small' round='xsmall' width='large'>
      {showDeleteModal && <DeleteModal toggleModal={toggleDeleteModal} />}
      <Box border='bottom' height={{ min: '3em' }}  pad={{ top: 'xsmall', horizontal: 'xsmall' }}>
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
            <SeenButtonContainer disabled={isViewer || !!reduction} reduction={reduction} tag={seen} />
            <FlagButtonContainer disabled={isViewer || !!reduction} reduction={reduction} tag={flagged} />
          </Box>
          <Box>
            {reduction.edited_consensus_text ? (
              <Text>Edited</Text>
            ) : (
              <Text>{parseFloat(reduction.consensus_score && reduction.consensus_score.toFixed(1)) || 0}/{reduction.number_views || 0}</Text>
            )}
          </Box>
        </Box>
      </Box>
      <Box border='bottom'>
        <Box gap='xsmall' margin={{ vertical: 'xsmall' }} overflow='auto'>
          {transcriptionOptions.map((transcription, index) =>
            <TranscriptionLine
              index={index}
              isViewer={isViewer}
              key={`LINE_${index}`}
              selectedItem={selectedItem}
              setItem={setItem}
              transcription={transcription}
            />)}
        </Box>
        <Box border='top' gap='xsmall' height={{ min: '4em' }} margin={{ horizontal: 'small', bottom: 'xsmall' }} pad={{ top: 'xsmall' }}>
          {reduction.consensus_text && !isViewer && (
            <Box>
              <Box direction='row' gap='xsmall'>
                <CheckBox
                  checked={selectedItem === algorithmChoice}
                  onChange={() => {
                    const setTo = selectedItem === algorithmChoice ? null : algorithmChoice
                    setItem(setTo)
                  }}
                />
                <Text>{reduction.consensus_text}</Text>
              </Box>
              <ItalicText margin={{ left: 'medium' }} size='xsmall'>aggregated transcription (via algorithm)</ItalicText>
            </Box>
          )}
          {!isViewer && (
            <Box direction='row' gap='xsmall'>
              <CheckBox
                checked={selectedItem === typedChoice}
                onChange={() => {
                  const setTo = selectedItem === typedChoice ? null : typedChoice
                  setItem(setTo)
                }}
              />
              <Box fill='horizontal'>
                <TextInput
                  onChange={(e) => {
                    setInputText(e.target.value)
                    if (e.target.value.length && selectedItem !== typedChoice) {
                      setItem(typedChoice)
                    } else if (!e.target.value.length) { setItem(null) }
                  }}
                  placeholder='Write new...'
                  size='xsmall'
                  value={inputText}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box direction='row' height={{ min: '1.5em' }} justify='between' margin='xsmall'>
        {!isViewer && (
          <Box direction='row'>
            <Button onClick={addLine} margin={{ right: 'small' }}><CapitalText size='xsmall'>Add Line Below</CapitalText></Button>
            <Button onClick={toggleDeleteModal}><CapitalText size='xsmall'>Delete Line</CapitalText></Button>
          </Box>
        )}
        <Box direction='row' margin={{ left: 'auto' }} gap='small'>
          {!isViewer && (
            <Button
              disabled={selectedItem === null}
              label={<CapitalText size='xsmall'>Replace With Selected</CapitalText>}
              onClick={replaceWithSelected}
              plain
            />
            )}
          <Button onClick={closeModal}><CapitalText size='xsmall'>Close</CapitalText></Button>
        </Box>
      </Box>
    </RelativeBox>
  )
}

LineViewer.defaultProps = {
  addLine: () => {},
  closeModal: () => {},
  consensusText: '',
  flagged: false,
  isViewer: false,
  reduction: {
    consensus_score: 0,
    edited_consensus_text: ''
  },
  replaceWithSelected: () => {},
  seen: false,
  selectedItem: null,
  setItem: () => {},
  transcriptionOptions: []
}

LineViewer.propTypes = {
  addLine: PropTypes.func,
  closeModal: PropTypes.func,
  consensusText: PropTypes.string,
  flagged: PropTypes.bool,
  isViewer: PropTypes.bool,
  reduction: PropTypes.shape(),
  replaceWithSelected: PropTypes.func,
  seen: PropTypes.bool,
  selectedItem: PropTypes.number,
  setItem: PropTypes.func,
  transcriptionOptions: PropTypes.array
}

export { LineViewer }
export default observer(withThemeContext(LineViewer, theme))
