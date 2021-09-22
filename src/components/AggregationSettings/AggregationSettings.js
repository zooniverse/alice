import { Box, Button, Stack, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import Confirmation from './Confirmation'
import ChooseReducer from './ChooseReducer'
import OpticsReducer from './OpticsReducer'
import DBScanReducer from './DBScanReducer'
import { REDUCERS } from './AggregationSettingsContainer'

const StyledBox = styled(Box)`
  :hover {
    cursor: move
  }
`

export default function AggregationSettings(props) {
  return (
    <Box
      background='white'
      elevation='medium'
      round='xsmall'
      width='30em'
    >
      <StyledBox align='center' background='light-2' className={props.dragHandle} height='1em' round={{ corner: 'top', size: 'xsmall' }}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </StyledBox>
      <Stack>
        <Box>
          <Box
            border='bottom'
            direction='row'
            justify='between'
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
          >
            <Text>Edit Aggregation Settings</Text>
            <Button
              a11yTitle="Close Aggregation Settings"
              label={<FontAwesomeIcon icon={faTimesCircle} />}
              onClick={props.closeContainer}
              plain
            />
          </Box>
          <Box>
            {props.currentScreen === REDUCERS.CHOOSE &&
              <ChooseReducer
                closeContainer={props.closeContainer}
                selectReducer={props.selectReducer}
                selectedReducer={props.selectedReducer}
                setScreen={props.setScreen}
              />}
            {props.currentScreen === REDUCERS.OPTICS && (
              <OpticsReducer
                closeContainer={props.closeContainer}
                defaultParams={props.reducer === 'optics_line_text_reducer' ? props.parameters : {}}
                setCallback={props.setCallback}
                setScreen={props.setScreen}
                submitOptics={props.submitOptics}
              />
            )}
            {props.currentScreen === REDUCERS.DBSCAN && (
              <DBScanReducer
                closeContainer={props.closeContainer}
                defaultParams={props.reducer === 'poly_line_text_reducer' ? props.parameters : {}}
                setCallback={props.setCallback}
                setScreen={props.setScreen}
                submitDBScan={props.submitDBScan}
              />
            )}
          </Box>
        </Box>
        {props.confirmationCallback && <Confirmation callback={props.confirmationCallback} setCallback={props.setCallback} />}
      </Stack>
    </Box>
  )
}

ChooseReducer.defaultProps = {
  closeContainer: () => {},
  confirmationCallback: null,
  currentScreen: null,
  selectReducer: () => {},
  selectedReducer: null,
  setScreen: () => {},
  submitDBScan: () => {},
  submitOptics: () => {}
}

ChooseReducer.propTypes = {
  closeContainer: func,
  confirmationCallback: func,
  currentScreen: string,
  selectReducer: func,
  selectedReducer: string,
  setScreen: func,
  submitDBScan: func,
  submitOptics: func
}
