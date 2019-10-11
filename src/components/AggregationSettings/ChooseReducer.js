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

export default function ChooseReducer({ currentScreen, selectReducer, selectedReducer, setScreen }) {
  return (
    <Box gap='xsmall'>
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
      <Box
        border='top'
        direction='row'
        gap='small'
        justify='end'
        pad={{ top: 'xsmall' }}
      >
        <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain/>
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
  currentScreen: null,
  disableNext: true,
  selectReducer: () => {},
  selectedReducer: null
}

ChooseReducer.propTypes = {
  currentScreen: string,
  disableNext: bool,
  selectReducer: func,
  selectedReducer: string
}
