import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates, constructText, mapExtractsToReductions } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer({ x, y }) {
  let [ extractLines, reductionLines ] = [[], []]
  const store = React.useContext(AppContext)
  const index = store.subjects.index
  const transcription = store.transcriptions.current

  const validExtracts = store.transcriptions.extracts.filter(extract => extract.data[`frame${index}`])
  const extractsByUser = validExtracts.reduce((list, extract) => {
    if (!list[extract.userId]) list[extract.userId] = []
    list[extract.userId].push(extract.data)
    return list
  }, {})

  const transcriptionFrame = transcription && transcription.text && transcription.text.get(`frame${index}`)

  if (transcriptionFrame) {
    reductionLines = transcriptionFrame.map(transcription => constructCoordinates(transcription))
    const reductionText = transcriptionFrame.map(transcription => constructText(transcription))
    transcriptionFrame.forEach((reduction, reductionIndex) => {
      extractLines.push(mapExtractsToReductions(extractsByUser, reduction, reductionIndex, reductionText, index))
    })
  }

  const lines = { extractLines, reductionLines }

  return (
    <AnnotationsPane
      x={x}
      y={y}
      linesVisible={store.editor.linesVisible}
      extractLines={lines.extractLines}
      reductionLines={lines.reductionLines}
    />
  )
}

export default observer(AnnotationsPaneContainer)
