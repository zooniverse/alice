import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import ChooseReducer from './ChooseReducer'
import OpticsReducer from './OpticsReducer'
import DBScanReducer from './DBScanReducer'
import { SCREENS } from './AggregationSettingsContainer'

export default function AggregationSettings({ currentScreen, selectReducer, selectedReducer, setScreen, submitDBScan, submitOptics }) {
  return (
    <Box
      background='white'
      elevation='small'
      round='xsmall'
      width='30em'
    >
      <Box
        border='bottom'
        direction='row'
        justify='between'
        pad='small'
      >
        <Text>Edit Aggregation Settings</Text>
        <FontAwesomeIcon icon={faTimesCircle} />
      </Box>
      <Box pad='small'>
        {currentScreen === SCREENS.CHOOSE_REDUCER &&
          <ChooseReducer
            selectReducer={selectReducer}
            selectedReducer={selectedReducer}
            setScreen={setScreen}
          />}
        {currentScreen === SCREENS.OPTICS_REDUCER && <OpticsReducer setScreen={setScreen} submitOptics={submitOptics} />}
        {currentScreen === SCREENS.DBSCAN_REDUCER && <DBScanReducer setScreen={setScreen} submitDBScan={submitDBScan} />}
      </Box>
    </Box>
  )
}

ChooseReducer.defaultProps = {
  currentScreen: null,
  selectReducer: () => {},
  selectedReducer: null,
  setScreen: () => {},
  submitDBScan: () => {},
  submitOptics: () => {}
}

ChooseReducer.propTypes = {
  currentScreen: string,
  selectReducer: func,
  selectedReducer: string,
  setScreen: func,
  submitDBScan: func,
  submitOptics: func
}
