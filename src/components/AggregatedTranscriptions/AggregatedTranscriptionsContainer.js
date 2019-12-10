import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import AggregatedTranscriptions from './AggregatedTranscriptions'

function AggregatedTranscriptionsContainer() {
  const store = React.useContext(AppContext)
  const showOverlay = store.aggregations.showModal

  return <AggregatedTranscriptions showOverlay={showOverlay} />
}

export default observer(AggregatedTranscriptionsContainer)
