import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer({ x, y }) {
  let reductionLines = []
  const store = React.useContext(AppContext)
  const transcriptionFrame = store.transcriptions.currentFrame

  if (transcriptionFrame) {
    reductionLines = transcriptionFrame.map(transcription => constructCoordinates(transcription))
  }

  const onLineClick = (index) => store.transcriptions.setActiveTranscription(index)

  return (
    <AnnotationsPane
      x={x}
      y={y}
      activeSlope={store.transcriptions.activeSlope}
      linesVisible={store.editor.linesVisible}
      extractLines={store.transcriptions.parsedExtracts}
      reductionLines={reductionLines}
      onLineClick={onLineClick}
      activeTranscriptionIndex={store.transcriptions.activeTranscriptionIndex}
    />
  )
}

export default observer(AnnotationsPaneContainer)
