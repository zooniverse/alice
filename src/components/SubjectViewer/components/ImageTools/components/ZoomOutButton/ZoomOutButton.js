import React from 'react'
import { ZoomOut as ZoomOutIcon } from 'grommet-icons'
import { Button } from 'grommet'
import PropTypes from 'prop-types'

function ZoomOutButton({ onClick }) {
  return (
    <Button
      label={<ZoomOutIcon color='#000000' />}
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
