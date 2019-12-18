import React from 'react'
import { Box, Text } from 'grommet'
import { string } from 'prop-types'

function SearchTag({ tag }) {
  return (
    <Box>
      <Text>{tag}</Text>
    </Box>
  )
}

SearchTag.propTypes = {
  tag: string
}

SearchTag.defaultProps = {
  tag: ''
}

export default SearchTag
