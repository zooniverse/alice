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
  parsedLines = validExtracts.map(transcription => constructCoordinatesFromExtract(transcription.data[`frame${index}`]))
  console.log('extracts', parsedLines);
  console.log('reductions', store.transcriptions.current.text.frame0);

  return parsedLines.map((line, i) => {
    return (
      <AnnotationsPane
        key={`EXTRACT_LINE_${i}`}
        isExtract
        x={x}
        y={y}
        lines={line}
      />
    )
  })
}

export default observer(ExtractsPaneContainer)
