import React from 'react'
import { ZoomIn as ZoomInIcon } from 'grommet-icons'
import { Button } from 'grommet'
import PropTypes from 'prop-types'

function ZoomInButton({ onClick }) {
  return (
    <Button
      label={<ZoomInIcon color='#000000' />}
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
