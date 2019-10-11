import React from 'react'
import AggregationSettings from './AggregationSettings'

const REDUCERS = {
  OPTICS: 'OPTICS_REDUCER',
  DBSCAN: 'DBSCAN_REDUCER'
}

const SCREENS = {
  CHOOSE_REDUCER: 'CHOOSE_REDUCER',
  OPTICS_REDUCER: 'OPTICS_REDUCER',
  DBSCAN_REDUCER: 'DBSCAN_REDUCER'
}

function AggregationSettingsContainer() {
  const [ selectedReducer, selectReducer ] = React.useState(null);
  const [ currentScreen, setScreen ] = React.useState(SCREENS.CHOOSE_REDUCER);

  return (
    <AggregationSettings
      currentScreen={currentScreen}
      selectReducer={selectReducer}
      selectedReducer={selectedReducer}
      setScreen={setScreen}
    />
  )
}

export {
  AggregationSettingsContainer,
  REDUCERS,
  SCREENS
}
