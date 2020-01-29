import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinates, constructText } from 'helpers/parseTranscriptionData'

function AnnotationsPaneContainer({ x, y }) {
  let [ extractLines, reductionLines ] = [[], []]
  const store = React.useContext(AppContext)
  const index = store.subjects.index
  const transcription = store.transcriptions.current

  const extracts = store.transcriptions.extracts
  const validExtracts = extracts.filter(extract => extract.data[`frame${index}`])
  const extractsByUser = validExtracts.reduce((list, extract) => {
    if (!list[extract.userId]) list[extract.userId] = []
    list[extract.userId].push(extract.data)
    return list
  }, {})

  const transcriptionFrame = transcription && transcription.text && transcription.text[`frame${index}`]

  if (transcriptionFrame) {
    reductionLines = transcriptionFrame.map(transcription => constructCoordinates(transcription))
    const reductionText = transcriptionFrame.map(transcription => constructText(transcription))
    transcriptionFrame.forEach((reduction, reductionIndex) => {
      extractLines.push([])
      reduction.user_ids.forEach((id, userIdIndex) => {
        extractsByUser[id].forEach(extract => {
          if (extract[`frame${index}`]) {
            const extractLocation = extract[`frame${index}`].text[reduction.extract_index[userIdIndex]]
            if (extractLocation && extractLocation[0] === reductionText[reductionIndex][userIdIndex]) {
              const annotationIndexToExtract = reduction.extract_index[userIdIndex]
              extractLines[reductionIndex].push({
                x: extract[`frame${index}`].points.x[annotationIndexToExtract],
                y: extract[`frame${index}`].points.y[annotationIndexToExtract]
              })
            }
          }
        })
      })
    })
  }
  console.log(extractLines, reductionLines);

  const lines = { extractLines, reductionLines }

  return (
    <AnnotationsPane
      x={x}
      y={y}
      lines={lines.reductionLines}
    />
  )
}

export default observer(AnnotationsPaneContainer)
