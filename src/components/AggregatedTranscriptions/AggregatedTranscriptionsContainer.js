import React from 'react'
import AppContext from 'store'
import AggregatedTranscriptions from './AggregatedTranscriptions'

export default function AggregatedTranscriptionsContainer() {
  const store = React.useContext(AppContext)
  const showSettings = store.aggregations.showSettings

  return <AggregatedTranscriptions showSettings={showSettings}/>
}
