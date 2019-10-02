import React from 'react'
import { ZoomIn as ZoomInIcon } from 'grommet-icons'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'

function ZoomInButton({ onClick }) {
  return (
    <Button
      label={
        <Box margin='xsmall'>
          <ZoomInIcon color='#000000' />
        </Box>}
      onClick={onClick}
      plain
    />
  )
}

ZoomInButton.propTypes = {
  onClick: PropTypes.func
}

ZoomInButton.defaultProps = {
  onClick: () => {}
}

export default ZoomInButton
