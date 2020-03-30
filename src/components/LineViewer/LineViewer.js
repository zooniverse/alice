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
  const isNewLine = !consensusText
  const deleteText = isNewLine ? 'Cancel' : 'Delete Line'
  const addLineText = isNewLine ? 'Add Line' : 'Replace With Selected'

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
    if (isNewLine) closeModal()
  }

  return (
    <RelativeBox background='white' elevation='small' round='xsmall' width='large'>
      {showDeleteModal && <DeleteModal toggleModal={toggleDeleteModal} />}
      <Box border='bottom' height={{ min: `${!isNewLine ? '3em' : ''}` }} gap='xxsmall' pad={{ vertical: 'xsmall', horizontal: 'xsmall' }}>
        <Box align='center' direction='row' justify='between'>
          <Box>
            <CapitalText size='0.6em' weight='bold'>Selected Transcription</CapitalText>
          </Box>
          {!isNewLine && (
            <Box align='center' direction='row' gap='xsmall'>
              <CapitalText size='0.6em' weight='bold'>Flag</CapitalText>
              <CapitalText size='0.6em' weight='bold'>Consensus Score</CapitalText>
            </Box>
          )}
        </Box>
        {!isNewLine && (
          <Box align='center' direction='row' gap='xsmall' justify='between'>
            <Box fill='horizontal'>
              <Text weight='bold'>{consensusText}</Text>
            </Box>
            <Box direction='row'>
              <SeenButtonContainer disabled={isViewer} reduction={reduction} tag={seen} />
              <FlagButtonContainer disabled={isViewer} reduction={reduction} tag={flagged} />
            </Box>
            <Box>
              {reduction.edited_consensus_text ? (
                <Text>Edited</Text>
              ) : (
                <Text>{parseFloat(reduction.consensus_score.toFixed(1))}/{reduction.number_views}</Text>
              )}
            </Box>
          </Box>
        )}
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
        <Box gap='xsmall' height={{ min: `${!isNewLine ? '4em' : ''}` }} margin={{ horizontal: 'small', bottom: 'xsmall' }}>
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
      <Box direction='row' height={{ min: '1.5em' }} justify='between' margin={{ horizontal: 'xsmall', bottom: 'xsmall', top: '0.25em' }}>
        <Box direction='row'>
          {!isNewLine && (
            <Button
              disabled={isViewer}
              label={<CapitalText size='xsmall'>Add Line Below</CapitalText>}
              margin={{ right: 'small' }}
              onClick={addLine}
              plain
            />
          )}
          <Button
            disabled={isViewer}
            label={<CapitalText size='xsmall'>{deleteText}</CapitalText>}
            onClick={toggleDeleteModal}
            plain
          />
        </Box>
        <Box direction='row' margin={{ left: 'auto' }} gap='small'>
          <Button
            disabled={selectedItem === null || isViewer}
            label={<CapitalText size='xsmall'>{addLineText}</CapitalText>}
            onClick={replaceWithSelected}
            plain
          />
          {!isNewLine && (
            <Button
              label={<CapitalText size='xsmall'>Close</CapitalText>}
              onClick={closeModal}
              plain
            />
          )}
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
    consensus_text: '',
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
