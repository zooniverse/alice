import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import { bool, func, string } from 'prop-types'
import DBScan from 'images/dbscan.png'
import Optics from 'images/optics.png'
import styled, { css } from 'styled-components'
import { REDUCERS } from './AggregationSettingsContainer'

const OpticsBox = styled(Box)`
  ${css`background: ${props => props.selectedReducer === REDUCERS.OPTICS && '#F5F5F5'};`}
  ${css`border: ${props => props.selectedReducer === REDUCERS.OPTICS ?
    '1px solid #979797' : '1px solid transparent'};`}
`

const DbScanBox = styled(Box)`
  ${css`background: ${props => props.selectedReducer === REDUCERS.DBSCAN && '#F5F5F5'};`}
  ${css`border: ${props => props.selectedReducer === REDUCERS.DBSCAN ?
    '1px solid #979797' : '1px solid transparent'};`}
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
                <Image alt='Optics Aggregation Example' fit='contain' src={Optics} />
                <Text>OPTICS Reducer</Text>
                <Text size='xsmall'>Used for clustering full-width transcriptions</Text>
              </OpticsBox>
            }
            onClick={() => { selectReducer(REDUCERS.OPTICS)}}
            plain
          />
          <Button
            label={
              <DbScanBox selectedReducer={selectedReducer} gap='xsmall' pad='small'>
                <Image alt='DBScan Aggregation Example' fit='contain' src={DBScan} />
                <Text>DBSCAN Reducer</Text>
                <Text size='xsmall'>Used for clustering shorter, incomplete transcriptions of a line</Text>
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
