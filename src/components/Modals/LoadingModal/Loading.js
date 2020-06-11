import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Loading() {
  return (
    <Box align='center' gap='xsmall' margin='small'>
      <Box direction='row' gap='xsmall'>
        <Text>Loading</Text>
        <FontAwesomeIcon icon={faSpinner} spin />
      </Box>
      <Text>This could take a couple minutes</Text>
    </Box>
  )
}

Loading.propTypes = {
}

Loading.defaultProps = {
}

export default Loading
