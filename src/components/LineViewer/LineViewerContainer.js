import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { constructText } from 'helpers/parseTranscriptionData'
import LineViewer from './LineViewer'

function LineViewerContainer() {
  const store = React.useContext(AppContext)
  const [selectedItem, setItem] = React.useState()
  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)
  const subjectIndex = store.subjects.index
  const transcriptionIndex = store.transcriptions.activeTranscriptionIndex
  const reduction = store.transcriptions.current &&
    store.transcriptions.current.text &&
    store.transcriptions.current.text.get(`frame${subjectIndex}`)[transcriptionIndex]
  const consensusText = reduction && (reduction.edited_consensus_text || reduction.consensus_text)

  const [textOptions, setTextOptions] = React.useState([])
  const [transcriptionOptions, setTranscriptionOptions] = React.useState([])

  React.useEffect(() => {
    const textOptions = constructText(reduction)
    const transcriptionArray = textOptions.map((text, i) => {
      return {
        date: '',
        goldStandard: (reduction.gold_standard && reduction.gold_standard[i]) || false,
        userName: 'Anonymous',
        text
      }
    })
    setTranscriptionOptions(transcriptionArray)
    textOptions.push(reduction.consensus_text)
    textOptions.push('')
    setTextOptions(textOptions)
  }, [reduction])

  const replaceWithSelected = () => {
    const isAlgorithmChoice = selectedItem === transcriptionOptions.length
    reduction.setConsensusText(textOptions[selectedItem], isAlgorithmChoice)
  }

  return (
    <LineViewer
      closeModal={closeModal}
      consensusText={consensusText}
      flagged={reduction && reduction.flagged}
      reduction={reduction}
      replaceWithSelected={replaceWithSelected}
      seen={reduction && reduction.seen}
      selectedItem={selectedItem}
      setItem={setItem}
      setTextOptions={setTextOptions}
      textOptions={textOptions}
      transcriptionOptions={transcriptionOptions}
    />
  )
}

export default observer(LineViewerContainer)
