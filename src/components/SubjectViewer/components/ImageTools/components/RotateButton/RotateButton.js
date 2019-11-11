import React from 'react'
import { Refresh } from 'grommet-icons'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'

function RotateButton({ onClick }) {
  return (
    <Button
      a11yTitle="Rotate Image 90 Degrees"
      label={
        <Box margin='xsmall'>
          <Refresh color='#000000' />
        </Box>}
      onClick={onClick}
      plain
    />
  )
}

RotateButton.propTypes = {
  onClick: PropTypes.func
}

RotateButton.defaultProps = {
  onClick: () => {}
}

export default RotateButton
