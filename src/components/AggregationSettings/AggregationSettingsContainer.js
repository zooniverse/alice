import React from 'react'
import AggregationSettings from './AggregationSettings'

const REDUCERS = {
  CHOOSE: 'CHOOSE_REDUCER',
  OPTICS: 'OPTICS_REDUCER',
  DBSCAN: 'DBSCAN_REDUCER'
}

function AggregationSettingsContainer() {
  const [ selectedReducer, selectReducer ] = React.useState(null);
  const [ currentScreen, setScreen ] = React.useState(REDUCERS.CHOOSE);
  const [ confirmationCallback, setCallback ] = React.useState(null)
  const submitOptics = (e) => { console.log('Submitting Optics Form', e)}
  const submitDBScan = (e) => { console.log('Submitting DBScan Form', e)}

  return (
    <AggregationSettings
      confirmationCallback={confirmationCallback}
      currentScreen={currentScreen}
      selectReducer={selectReducer}
      selectedReducer={selectedReducer}
      setCallback={setCallback}
      setScreen={setScreen}
      submitDBScan={submitDBScan}
      submitOptics={submitOptics}
    />
  )
}

export {
  AggregationSettingsContainer,
  REDUCERS
}
