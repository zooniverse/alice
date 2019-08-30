import React from 'react'
import { Box } from 'grommet'
import ZoomInButtonContainer from './components/ZoomInButton'
import ZoomOutButtonContainer from './components/ZoomOutButton'
import RotateButtonContainer from './components/RotateButton'

function ImageTools() {
  const borderStyle = { side: 'right', color: '#979797' }
  const padStyle = { horizontal: 'small', vertical: 'xsmall' }
  return (
    <Box background='#A6A7A9' direction='row' elevation='large' round='xxsmall'>
      <Box border={borderStyle} pad={padStyle}>
        <ZoomInButtonContainer />
      </Box>
      <Box border={borderStyle} pad={padStyle}>
        <ZoomOutButtonContainer />
      </Box>
      <Box pad={padStyle}>
        <RotateButtonContainer />
      </Box>
    </Box>
  )
}

ImageTools.propTypes = {
}

export default ImageTools
