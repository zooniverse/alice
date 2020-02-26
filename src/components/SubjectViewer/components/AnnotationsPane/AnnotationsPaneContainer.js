import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer({ x, y }) {
  let reductionLines = []
  const store = React.useContext(AppContext)
  const index = store.transcriptions.index
  const transcription = store.transcriptions.current
  const transcriptionFrame = transcription && transcription.text && transcription.text.get(`frame${index}`)

  if (transcriptionFrame) {
    reductionLines = transcriptionFrame.map(transcription => constructCoordinates(transcription))
  }

  return (
    <AnnotationsPane
      x={x}
      y={y}
      linesVisible={store.editor.linesVisible}
      extractLines={store.transcriptions.parsedExtracts}
      reductionLines={reductionLines}
    />
  )
}

export default observer(AnnotationsPaneContainer)
