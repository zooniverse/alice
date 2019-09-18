import React from 'react'
import { ZoomOut as ZoomOutIcon } from 'grommet-icons'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'

function ZoomOutButton({ onClick }) {
  return (
    <Button
      label={
        <Box margin='xsmall'>
          <ZoomOutIcon color='#000000'/>
        </Box>}
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
