import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import ChooseReducer from './ChooseReducer'
import OpticsReducer from './OpticsReducer'
import DBScanReducer from './DBScanReducer'
import { REDUCERS } from './AggregationSettingsContainer'

const StyledBox = styled(Box)`
  :hover {
    cursor: move
  }
`

export default function AggregationSettings({ currentScreen, selectReducer, selectedReducer, setScreen, submitDBScan, submitOptics, toggleSettings }) {
  return (
    <Box
      background='white'
      elevation='small'
      round='xsmall'
      width='28em'
    >
      <StyledBox align='center' background='gray' className='handle' round={{ size: 'xsmall', corner: 'top' }} height='1em'>
        <FontAwesomeIcon color='black' icon={faEllipsisH} />
      </StyledBox>
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
      <Box>
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
