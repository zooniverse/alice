import React from 'react'
import AppContext from 'store'
import LineViewer from './LineViewer'
import mockLines from './mockLines'

const mockAggregatedText = 'Mauris elementum pulvinar lacinia. Donec tincidunt pretium quam, at condimentum ex lacinia eu.';

function LineViewerContainer() {
  const store = React.useContext(AppContext)
  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)
  const subjectIndex = store.subjects.index
  const transcriptionIndex = store.transcriptions.activeTranscriptionIndex
  const reduction = store.transcriptions.current &&
    store.transcriptions.current.text &&
    store.transcriptions.current.text[`frame${subjectIndex}`][transcriptionIndex]

  return (
    <LineViewer
      aggregatedText={mockAggregatedText}
      classifications={mockLines}
      closeModal={closeModal}
      reduction={reduction}
    />
  )
}

export default LineViewerContainer
