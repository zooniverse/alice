import React from 'react'
import { ZoomOut as ZoomOutIcon } from 'grommet-icons'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'

function ZoomOutButton({ onClick }) {
  return (
    <Button
      a11yTitle="Zoom out on Subject"
      label={
        <Box margin='xsmall'>
          <ZoomOutIcon color='#000000'/>
        </Box>}
      onClick={onClick}
      plain
    />
  )
}

ZoomOutButton.propTypes = {
  onClick: PropTypes.func
}

ZoomOutButton.defaultProps = {
  onClick: () => {}
}

export default ZoomOutButton
