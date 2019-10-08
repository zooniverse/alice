import React from 'react'
import AggregationSettings from './AggregationSettings'

const REDUCERS = {
  OPTICS: 'OPTICS',
  DBSCAN: 'DBSCAN'
}

function AggregationSettingsContainer() {
  const [ selectedReducer, selectReducer ] = React.useState();
  return (
    <AggregationSettings
      selectReducer={selectReducer}
      selectedReducer={selectedReducer}
    />
  )
}

export {
  AggregationSettingsContainer,
  REDUCERS
}
