import React from 'react'
import { Box, Stack, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import Confirmation from './Confirmation'
import ChooseReducer from './ChooseReducer'
import OpticsReducer from './OpticsReducer'
import DBScanReducer from './DBScanReducer'
import { REDUCERS } from './AggregationSettingsContainer'

export default function AggregationSettings(props) {
  return (
    <Box
      background='white'
      elevation='small'
      round='xsmall'
      width='30em'
    >
      <Box align='center' background='light-2' height='1em' round={{ corner: 'top', size: 'xsmall' }}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </Box>
      <Stack>
        <Box>
          <Box
            border='bottom'
            direction='row'
            justify='between'
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
          >
            <Text>Edit Aggregation Settings</Text>
            <FontAwesomeIcon icon={faTimesCircle} />
          </Box>
          <Box>
            {props.currentScreen === REDUCERS.CHOOSE &&
              <ChooseReducer
                selectReducer={props.selectReducer}
                selectedReducer={props.selectedReducer}
                setScreen={props.setScreen}
              />}
            {props.currentScreen === REDUCERS.OPTICS && <OpticsReducer setCallback={props.setCallback} setScreen={props.setScreen} submitOptics={props.submitOptics} />}
            {props.currentScreen === REDUCERS.DBSCAN && <DBScanReducer setCallback={props.setCallback} setScreen={props.setScreen} submitDBScan={props.submitDBScan} />}
          </Box>
        </Box>
        {props.confirmationCallback && <Confirmation callback={props.confirmationCallback} setCallback={props.setCallback} />}
      </Stack>
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
