import React from 'react'
import AppContext from 'store'
import LineViewer from './LineViewer'
import mockLines from './mockLines'

const mockAggregatedText = 'Mauris elementum pulvinar lacinia. Donec tincidunt pretium quam, at condimentum ex lacinia eu.';

function LineViewerContainer() {
  const store = React.useContext(AppContext)
  const closeModal = e => store.transcriptions.setActiveTranscription(undefined)

  return (
    <LineViewer
      aggregatedText={mockAggregatedText}
      classifications={mockLines}
      closeModal={closeModal}
    />
  )
}

export default LineViewerContainer
