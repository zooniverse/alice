import React from 'react'
import { Box, Button, Text } from 'grommet'
import { func, string } from 'prop-types'
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

export default function ChooseReducer({ selectReducer, selectedReducer }) {
  return (
    <Box gap='xsmall'>
      <Text>
        Choose a clustering algorithm based on the way in which transcriptions
        have been made.
      </Text>
      <Box
        direction='row'
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
  )
}

ChooseReducer.defaultProps = {
  selectReducer: () => {},
  selectedReducer: null
}

ChooseReducer.propTypes = {
  selectReducer: func,
  selectedReducer: string
}
