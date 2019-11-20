import React from 'react'
import { Rnd } from 'react-rnd'
import { AggregationSettingsContainer } from './AggregationSettingsContainer'

function AggregationModal() {
  const dragHandle = "dragHandle"

  return (
    <Rnd dragHandleClassName={dragHandle} enableResizing={false} >
      <AggregationSettingsContainer dragHandle={dragHandle} />
    </Rnd>
  )
}

export default AggregationModal
