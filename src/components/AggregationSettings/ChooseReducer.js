import React from 'react'
import { Box, Button, Text } from 'grommet'
import { bool, func, string } from 'prop-types'
import { REDUCERS } from './AggregationSettingsContainer'
import styled from 'styled-components'

const OpticsBox = styled(Box)`
  background: ${props => props.selectedReducer === REDUCERS.OPTICS && '#F5F5F5'};
  border: ${props => props.selectedReducer === REDUCERS.OPTICS ?
    '1px solid #979797' : '1px solid transparent'};
`

const DbScanBox = styled(Box)`
  background: ${props => props.selectedReducer === REDUCERS.DBSCAN && '#F5F5F5'};
  border: ${props => props.selectedReducer === REDUCERS.DBSCAN ?
    '1px solid #979797' : '1px solid transparent'};
`

export default function ChooseReducer({ closeContainer, currentScreen, selectReducer, selectedReducer, setScreen }) {
  return (
    <Box gap='xsmall'>
      <Box gap='xsmall' pad='small'>
        <Text>
          Choose a clustering algorithm based on the way in which transcriptions
          have been made.
        </Text>
        <Box
          direction='row'
          margin={{ bottom: 'large' }}
        >
          <Button
            label={
              <OpticsBox selectedReducer={selectedReducer} gap='xsmall' pad='small'>
                <Box background='light-4' height='8em' fill='horizontal'/>
                <Text>OPTICS Reducer</Text>
                <Text>Short description of when to use this algorithm</Text>
              </OpticsBox>
            }
            onClick={() => { selectReducer(REDUCERS.OPTICS)}}
            plain
          />
          <Button
            label={
              <DbScanBox selectedReducer={selectedReducer} gap='xsmall' pad='small'>
                <Box background='light-4' height='8em' fill='horizontal'/>
                <Text>DBSCAN Reducer</Text>
                <Text>Short description of when to use this algorithm</Text>
              </DbScanBox>
            }
            onClick={() => { selectReducer(REDUCERS.DBSCAN)}}
            plain
          />
        </Box>
      </Box>
      <Box
        border='top'
        direction='row'
        gap='small'
        justify='end'
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
      >
        <Button
          a11yTitle="Close Aggregation Settings"
          label={<Text size='small'>CLOSE AND CANCEL</Text>}
          onClick={closeContainer}
          plain
        />
        <Button
          disabled={selectedReducer === null}
          label={<Text size='small'>NEXT</Text>}
          onClick={() => setScreen(selectedReducer)}
          plain
        />
      </Box>
    </Box>
  )
}

ChooseReducer.defaultProps = {
  closeContainer:  () => {},
  currentScreen: null,
  disableNext: true,
  selectReducer: () => {},
  selectedReducer: null
}

ChooseReducer.propTypes = {
  closeContainer: func,
  currentScreen: string,
  disableNext: bool,
  selectReducer: func,
  selectedReducer: string
}
