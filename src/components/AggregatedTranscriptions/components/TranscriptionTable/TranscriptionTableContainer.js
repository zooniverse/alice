import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import constructText from 'helpers/constructText'
import TranscriptionTable from './TranscriptionTable'
import data from './mockData'

function TranscriptionTableContainer() {
  const store = React.useContext(AppContext)
  const transcriptionData = store.transcriptions.current && store.transcriptions.current.text
  const frameData = transcriptionData && transcriptionData[`frame${store.subjects.index}`]
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

  return (
    <TranscriptionTable
      data={finalData}
      toggleTranscription={store.aggregations.toggleTranscription}
    />
  )
}

export default observer(TranscriptionTableContainer)
