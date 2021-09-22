import { useContext } from 'react';
import { observer } from 'mobx-react'
import AppContext from 'store'
import TranscriptionTable from './TranscriptionTable'

function TranscriptionTableContainer() {
  const store = useContext(AppContext)
  const frameData = store.transcriptions.currentTranscriptions || []
  const setActiveTranscription = id => store.transcriptions.setActiveTranscription(id);

  return (
    <TranscriptionTable
      data={frameData}
      isViewer={store.projects.isViewer}
      setActiveTranscription={setActiveTranscription}
      setTextObject={store.transcriptions.setTextObject}
      slopeIndex={store.transcriptions.slopeIndex}
    />
  )
}

export default observer(TranscriptionTableContainer)
