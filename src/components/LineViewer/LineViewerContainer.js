import React from 'react'
import AppContext from 'store'
import LineViewer from './LineViewer'
import mockLines from './mockLines'

function LineViewerContainer() {
  const store = React.useContext(AppContext)
  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)
  const subjectIndex = store.subjects.index
  const transcriptionIndex = store.transcriptions.activeTranscriptionIndex
  const reduction = store.transcriptions.current &&
    store.transcriptions.current.text &&
    store.transcriptions.current.text.get(`frame${subjectIndex}`)[transcriptionIndex]

  return (
    <LineViewer
      classifications={mockLines}
      closeModal={closeModal}
      reduction={reduction}
    />
  )
}

export default LineViewerContainer
