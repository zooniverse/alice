import React from 'react'
import { Box, Text } from 'grommet'

export default function ChooseReducer() {
  return (
    <Box>
      <Text>
        Choose a clustering algorithm based on the way in which transcriptions
        have been made.
      </Text>
      <Box
        direction='row'
        gap='medium'
        pad='small'
      >
        <Box gap='xsmall'>
          <Box background='light-4' height='8em' fill='horizontal'/>
          <Text>OPTICS Reducer</Text>
          <Text>Short description of when to use this algorithm</Text>
        </Box>
        <Box gap='xsmall'>
          <Box background='light-4' height='8em' fill='horizontal'/>
          <Text>DBSCAN Reducer</Text>
          <Text>Short description of when to use this algorithm</Text>
        </Box>
      </Box>
    </Box>
  )
}
