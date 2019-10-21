import React from 'react'
import AppContext from 'store'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import AggregatedTranscriptions from './AggregatedTranscriptions'
import AggregationSettings from '../AggregationSettings'

function AggregatedTranscriptionsContainer() {
  const store = React.useContext(AppContext)
  const showSettings = store.aggregations.showSettings

  return (
    <Box>
      <AggregatedTranscriptions disabled={showSettings}/>
    </Box>
  )
}

export default observer(AggregatedTranscriptionsContainer)
