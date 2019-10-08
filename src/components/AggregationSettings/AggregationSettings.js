import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function AggregationSettings() {
  return (
    <Box
      background='white'
      elevation='small'
      round='xsmall'
      width='medium'
    >
      <Box
        border='bottom'
        direction='row'
        justify='between'
        pad='xsmall'
      >
        <Text>Edit Aggregation Settings</Text>
        <FontAwesomeIcon icon={faTimesCircle} />
      </Box>
      <Box pad='xsmall'>

      </Box>
      <Box
        border='top'
        direction='row'
        gap='small'
        justify='end'
        pad='xsmall'
      >
        <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain/>
        <Button label={<Text size='small'>NEXT</Text>} plain/>
      </Box>
    </Box>
  )
}
