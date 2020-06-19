import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
  return (
    <Box align='center' gap='xsmall' margin='small'>
      <FontAwesomeIcon icon={faSpinner} spin />
      <Text>Reaggregating</Text>
      <Text>Please be patient, this could take several minutes</Text>
    </Box>
  )
}
