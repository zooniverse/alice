import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import constructText from 'helpers/constructText'
import TranscriptionTable from './TranscriptionTable'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)
  const transcriptionData = store.transcriptions.current && store.transcriptions.current.text
  const frameData = transcriptionData && transcriptionData[`frame${store.subjects.index}`]
  const setActiveTranscription = id => store.transcriptions.setActiveTranscription(id);
  const finalData = frameData && frameData.map((data) => {
    return ({
      text: constructText(data),
      reviewed: false,
      flagged: false,
      counts: data.number_views,
      consensus: data.consensus_score,
      goldStandard: false
    })
  })

  if (!finalData) return null

  return (
    <TranscriptionTable
      data={finalData}
      setActiveTranscription={setActiveTranscription}
    />
  )
}

export default observer(TranscriptionTableContainer)
