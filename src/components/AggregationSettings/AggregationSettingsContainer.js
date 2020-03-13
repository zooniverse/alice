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
  const closeContainer = () => store.aggregations.toggleModal()
  const [ selectedReducer, selectReducer ] = React.useState(null);
  const [ currentScreen, setScreen ] = React.useState(REDUCERS.CHOOSE);
  const [ confirmationCallback, setCallback ] = React.useState(null)
  const submitOptics = (params) => {
    store.transcriptions.reaggregateOptics(params)
    store.aggregations.setModal(false)
  }
  const submitDBScan = (params) => {
    store.transcriptions.reaggregateDBScan(params)
    store.aggregations.setModal(false)
  }

  return (
    <AggregationSettings
      closeContainer={closeContainer}
      confirmationCallback={confirmationCallback}
      currentScreen={currentScreen}
      dragHandle={dragHandle}
      reducer={store.transcriptions.current.reducer}
      parameters={store.transcriptions.current.parameters}
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
