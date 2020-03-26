import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import TranscriptionTable from './TranscriptionTable'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)
  const transcriptionData = store.transcriptions.current && store.transcriptions.current.text
  const frameData = (transcriptionData && transcriptionData.get(`frame${store.transcriptions.index}`)) || []
  const setActiveTranscription = id => store.transcriptions.setActiveTranscription(id);
  // console.log('reductions', frameData);
  //
  // frameData.forEach((item) => {
  //   console.log(item.line_slope);
  // })

  return (
    <TranscriptionTable
      data={frameData}
      isViewer={store.projects.isViewer}
      setActiveTranscription={setActiveTranscription}
      setTextObject={store.transcriptions.setTextObject}
    />
  )
}

export default observer(TranscriptionTableContainer)
