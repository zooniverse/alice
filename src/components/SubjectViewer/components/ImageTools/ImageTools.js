import React from 'react'
import { Box } from 'grommet'
import ZoomInButtonContainer from './components/ZoomInButton'
import ZoomOutButtonContainer from './components/ZoomOutButton'
import RotateButtonContainer from './components/RotateButton'
import ResetButtonContainer from './components/ResetButton'

function ImageTools() {
  const borderStyle = { side: 'right', color: '#979797' }
  return (
    <Box
      background='#A6A7A9'
      direction='row'
      elevation='large'
      margin='small'
      round='xxsmall'
    >
      <Box border={borderStyle}>
        <ZoomInButtonContainer />
      </Box>
      <Box border={borderStyle}>
        <ZoomOutButtonContainer />
      </Box>
      <Box border={borderStyle}>
        <RotateButtonContainer />
      </Box>
      <Box>
        <ResetButtonContainer />
      </Box>
    </Box>
  )
}

ImageTools.propTypes = {
}

export default ImageTools
