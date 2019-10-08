import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import ChooseReducer from './ChooseReducer'
import AdjustReducer from './AdjustReducer'
import { SCREENS } from './AggregationSettingsContainer'

export default function AggregationSettings({ currentScreen, selectReducer, selectedReducer, setScreen }) {
  const disableNext = selectedReducer === null;

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
        {(currentScreen !== SCREENS.CHOOSE_REDUCER) ? (
          <ChooseReducer
            selectReducer={selectReducer}
            selectedReducer={selectedReducer}
          />
        ) : <AdjustReducer /> }
      </Box>
      <Box
        border='top'
        direction='row'
        justify='between'
        pad='small'
      >
        {(currentScreen !== SCREENS.ADJUST_REDUCER) && (
          <Button label={<Text>BACK TO ALGORITHM CHOICE</Text>} plain />
        )}
        <Box align='end' direction='row' gap='small'>
          <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain/>
          <Button
            disabled={disableNext}
            label={<Text size='small'>NEXT</Text>}
            onClick={() => { setScreen(SCREENS.ADJUST_REDUCER) }}
            plain
          />
        </Box>
      </Box>
    </Box>
  )
}

ChooseReducer.defaultProps = {
  currentScreen: null,
  selectReducer: () => {},
  selectedReducer: null,
  setScreen: () => {}
}

ChooseReducer.propTypes = {
  currentScreen: string,
  selectReducer: func,
  selectedReducer: string,
  setScreen: func
}
