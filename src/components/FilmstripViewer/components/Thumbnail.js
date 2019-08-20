import React from 'react'
import { Box, Image } from 'grommet'

function Thumbnail ({ src }) {
  return (
    <Box height='xsmall' margin='xsmall' width='xsmall'>
      <Image fit='cover' src={src} />
    </Box>
  )
}

export default Thumbnail
