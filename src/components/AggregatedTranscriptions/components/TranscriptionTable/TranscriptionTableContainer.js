import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
// import { constructText } from 'helpers/parseTranscriptionData'
import TranscriptionTable from './TranscriptionTable'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)
  const transcriptionData = store.transcriptions.current && store.transcriptions.current.text
  const frameData = (transcriptionData && transcriptionData.get(`frame${store.subjects.index}`)) || []
  const setActiveTranscription = id => store.transcriptions.setActiveTranscription(id);

  return (
    <TranscriptionTable
      data={frameData}
      setActiveTranscription={setActiveTranscription}
      setTextObject={store.transcriptions.setTextObject}
    />
  )
}

export default observer(TranscriptionTableContainer)
