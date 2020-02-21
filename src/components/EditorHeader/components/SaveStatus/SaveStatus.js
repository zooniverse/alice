import React from 'react'
import { string } from 'prop-types'
import { Box, Text } from 'grommet'

export default function SaveStatus({ text }) {
  return (
    <Box>
      <Text>{text}</Text>
    </Box>
  )
}

SaveStatus.propTypes = {
  text: string
}

SaveStatus.defaultProps = {
  text: ''
}
