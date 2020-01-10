import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer({ x, y }) {
  let parsedLines = []
  const store = React.useContext(AppContext)
  const index = store.subjects.index
  const transcription = store.transcriptions.current
  const transcriptionFrame = transcription && transcription.text && transcription.text.get(`frame${index}`)
  if (transcriptionFrame) {
    parsedLines = transcriptionFrame.map(transcription => constructCoordinates(transcription))
  }

  return <AnnotationsPane x={x} y={y} lines={parsedLines} />
}

export default observer(AnnotationsPaneContainer)
