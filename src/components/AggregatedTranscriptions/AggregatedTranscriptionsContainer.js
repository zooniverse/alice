import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import AggregatedTranscriptions from './AggregatedTranscriptions'

function AggregatedTranscriptionsContainer({ margin }) {
  const store = React.useContext(AppContext)
  const showOverlay = store.aggregations.showModal || store.transcriptions.approved
  const showTranscription = store.aggregations.showTranscription
  const activeTranscription = store.transcriptions.activeTranscription

  return (
    <AggregatedTranscriptions
      activeTranscription={activeTranscription}
      margin={margin}
      showOverlay={showOverlay}
    />
  )
}

export default observer(AggregatedTranscriptionsContainer)
