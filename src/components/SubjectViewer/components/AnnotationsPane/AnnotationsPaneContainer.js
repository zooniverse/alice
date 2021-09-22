import { useContext } from 'react';
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer({ x, y }) {
  let reductionLines = []
  const store = useContext(AppContext)
  const transcriptions = store.transcriptions.currentTranscriptions

  if (transcriptions) {
    reductionLines = transcriptions.map(transcription => constructCoordinates(transcription))
  }

  const onLineClick = (index) => store.transcriptions.setActiveTranscription(index)

  return (
    <AnnotationsPane
      activeSlope={store.transcriptions.activeSlope}
      activeTranscriptionIndex={store.transcriptions.activeTranscriptionIndex}
      extractLines={store.transcriptions.parsedExtracts}
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
