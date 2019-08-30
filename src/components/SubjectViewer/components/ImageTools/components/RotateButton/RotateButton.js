import React from 'react'
import { Refresh } from 'grommet-icons'
import { Button } from 'grommet'
import PropTypes from 'prop-types'

function RefreshButton({ onClick }) {
  return (
    <Button
      label={<Refresh color='#000000' />}
      plain
    />
  )
}

RefreshButton.propTypes = {
  onClick: PropTypes.func
}

RefreshButton.defaultProps = {
  onClick: () => {}
}

export default RefreshButton
