import React from 'react'
import AppContext from 'store'
import AggregationSettings from './AggregationSettings'

const REDUCERS = {
  CHOOSE: 'CHOOSE_REDUCER',
  OPTICS: 'OPTICS_REDUCER',
  DBSCAN: 'DBSCAN_REDUCER'
}

function AggregationSettingsContainer({ dragHandle }) {
  const store = React.useContext(AppContext)
  const reducer = store.transcriptions.current && store.transcriptions.current.reducer
  const parameters = store.transcriptions.current && store.transcriptions.current.parameters
  const closeContainer = () => store.aggregations.toggleModal()
  const [ selectedReducer, selectReducer ] = React.useState(null);
  const [ currentScreen, setScreen ] = React.useState(REDUCERS.CHOOSE);
  const [ confirmationCallback, setCallback ] = React.useState(null)
  const submitOptics = (params) => {
    store.transcriptions.reaggregateOptics(params)
    store.aggregations.toggleModal()
  }
  const submitDBScan = (params) => {
    store.transcriptions.reaggregateDBScan(params)
    store.aggregations.toggleModal()
  }

  return (
    <AggregationSettings
      closeContainer={closeContainer}
      confirmationCallback={confirmationCallback}
      currentScreen={currentScreen}
      dragHandle={dragHandle}
      reducer={reducer}
      parameters={parameters}
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
