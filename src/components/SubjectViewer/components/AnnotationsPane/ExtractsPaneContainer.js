import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinatesFromExtract } from 'helpers/parseTranscriptionData'

function ExtractsPaneContainer({ x, y }) {
  let parsedLines = []
  const store = React.useContext(AppContext)
  const index = store.subjects.index
  const extracts = store.transcriptions.extracts
  const validExtracts = extracts.filter(extract => extract.data[`frame${index}`])
  parsedLines = validExtracts.map(transcription => constructCoordinatesFromExtract(transcription.data[`frame${index}`]))

  return parsedLines.map((line, i) => <AnnotationsPane key={`EXTRACT_LINE_${i}`} x={x} y={y} lines={line} />)
}

export default observer(ExtractsPaneContainer)
