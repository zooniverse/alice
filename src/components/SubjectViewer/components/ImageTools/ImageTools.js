import React from 'react'
import { Box } from 'grommet'
import { Refresh, ZoomIn, ZoomOut } from 'grommet-icons'

function ImageTools() {
  const borderStyle = { side: 'right', color: '#979797' }
  const padStyle = { horizontal: 'small', vertical: 'xsmall' }
  return (
    <Box background='#A6A7A9' direction='row' elevation='large' round='xxsmall'>
      <Box border={borderStyle} pad={padStyle}>
        <ZoomIn color='#000000' />
      </Box>
      <Box border={borderStyle} pad={padStyle}>
        <ZoomOut color='#000000' />
      </Box>
      <Box pad={padStyle}>
        <Refresh color='#000000' />
      </Box>
    </Box>
  )
}

ImageTools.propTypes = {
}

export default ImageTools
