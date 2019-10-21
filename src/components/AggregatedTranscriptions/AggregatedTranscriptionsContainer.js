import React from 'react'
import AppContext from 'store'
import { Box } from 'grommet'
import { Rnd } from 'react-rnd';
import styled from 'styled-components'
import { observer } from 'mobx-react'
import AggregatedTranscriptions from './AggregatedTranscriptions'
import AggregationSettings from '../AggregationSettings'

const StyledRnd = styled(Rnd)`
  z-index: 100;
`

function AggregatedTranscriptionsContainer() {
  const store = React.useContext(AppContext)
  const showSettings = store.aggregations.showSettings

  return (
    <Box>
      {showSettings && (
        <StyledRnd>
          <AggregationSettings />
        </StyledRnd>
      )}

      <AggregatedTranscriptions showSettings={showSettings}/>
    </Box>
  )
}

export default observer(AggregatedTranscriptionsContainer)
