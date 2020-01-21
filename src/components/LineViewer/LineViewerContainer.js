import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import LineViewer from './LineViewer'
import mockLines from './mockLines'

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

  return (
    <LineViewer
      classifications={mockLines}
      closeModal={closeModal}
      consensusText={consensusText}
      flagged={reduction && reduction.flagged}
      reduction={reduction}
      seen={reduction && reduction.seen}
      selectedItem={selectedItem}
      setItem={setItem}
    />
  )
}

export default observer(LineViewerContainer)
