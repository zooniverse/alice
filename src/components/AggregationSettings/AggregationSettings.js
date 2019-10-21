import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import ChooseReducer from './ChooseReducer'
import OpticsReducer from './OpticsReducer'
import DBScanReducer from './DBScanReducer'
import { REDUCERS } from './AggregationSettingsContainer'

export default function AggregationSettings({ currentScreen, selectReducer, selectedReducer, setScreen, submitDBScan, submitOptics, toggleSettings }) {
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
        <Button
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
          onClick={toggleSettings}
          plain
        />
      </Box>
      <Box pad='small'>
        {currentScreen === REDUCERS.CHOOSE &&
          <ChooseReducer
            selectReducer={selectReducer}
            selectedReducer={selectedReducer}
            setScreen={setScreen}
            toggleSettings={toggleSettings}
          />}
        {currentScreen === REDUCERS.OPTICS && <OpticsReducer setScreen={setScreen} submitOptics={submitOptics} toggleSettings={toggleSettings} />}
        {currentScreen === REDUCERS.DBSCAN && <DBScanReducer setScreen={setScreen} submitDBScan={submitDBScan} toggleSettings={toggleSettings} />}
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
