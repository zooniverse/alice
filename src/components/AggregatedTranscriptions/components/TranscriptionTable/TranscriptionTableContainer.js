import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import TranscriptionTable from './TranscriptionTable'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)
  const frameData = store.transcriptions.currentTranscriptions || []
  const setActiveTranscription = id => store.transcriptions.setActiveTranscription(id);

  return (
    <TranscriptionTable
      activeSlope={store.transcriptions.activeSlope}
      data={frameData}
      isViewer={store.projects.isViewer}
      setActiveTranscription={setActiveTranscription}
      setTextObject={store.transcriptions.setTextObject}
    />
  )
}

export default observer(TranscriptionTableContainer)
