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

  const onLineClick = (index) => store.transcriptions.setActiveTranscription(index)

  return (
    <AnnotationsPane
      activeSlope={store.transcriptions.activeSlope}
      activeTranscriptionIndex={store.transcriptions.activeTranscriptionIndex}
      isApproved={store.transcriptions.approved}
      linesVisible={store.editor.linesVisible}
      onLineClick={onLineClick}
      reductionLines={reductionLines}
      x={x}
      y={y}
    />
  )
}

export default observer(AnnotationsPaneContainer)
