import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'
import { constructCoordinatesFromExtract } from 'helpers/parseTranscriptionData'
import indexToRainbow from 'helpers/indexToRainbow'

function ExtractsPaneContainer({ x, y }) {
  let parsedLines = []
  const store = React.useContext(AppContext)
  const index = store.subjects.index
  const extracts = store.transcriptions.extracts
  const validExtracts = extracts.filter(extract => extract.data[`frame${index}`])
  parsedLines = validExtracts.map(transcription => constructCoordinatesFromExtract(transcription.data[`frame${index}`], transcription.userId))
  const reductions = store.transcriptions.current.text && store.transcriptions.current.text[`frame${index}`]
  console.log('parsed lines', parsedLines);
  console.log('reductions', reductions);
  const test = reductions.map(reduction => {
    console.log(reduction);
  })
  console.log('test', test);

  return parsedLines.map((line, i) => {
    return (
      <AnnotationsPane
        key={`EXTRACT_LINE_${i}`}
        isExtract
        x={x}
        y={y}
        lines={line.points}
      />
    )
  })
}

export default observer(ExtractsPaneContainer)
