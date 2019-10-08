import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import ChooseReducer from './ChooseReducer'

export default function AggregationSettings() {
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
      <Box height='medium' pad='small'>
        <ChooseReducer />
      </Box>
      <Box
        border='top'
        direction='row'
        gap='small'
        justify='end'
        pad='small'
      >
        <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain/>
        <Button label={<Text size='small'>NEXT</Text>} plain/>
      </Box>
    </Box>
  )
}
