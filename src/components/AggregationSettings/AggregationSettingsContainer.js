import React from 'react'
import AggregationSettings from './AggregationSettings'

const REDUCERS = {
  OPTICS: 'OPTICS',
  DBSCAN: 'DBSCAN'
}

const SCREENS = {
  CHOOSE_REDUCER: 'CHOOSE_REDUCER',
  ADJUST_REDUCER: 'ADJUST_REDUCER'
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
