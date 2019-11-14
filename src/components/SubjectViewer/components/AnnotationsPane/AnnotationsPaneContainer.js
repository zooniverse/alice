import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer() {
  let parsedLines = []
  const store = React.useContext(AppContext)
  const index = store.subject.index
  const transcription = store.transcriptions.current
  const transcriptionFrame = transcription && transcription.text && transcription.text[`frame${index}`]
  if (transcriptionFrame) {
    parsedLines = transcriptionFrame.map(transcription => constructCoordinates(transcription))
  }

  return <AnnotationsPane lines={parsedLines} />
}

export default observer(AnnotationsPaneContainer)
