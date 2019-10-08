import React from 'react'
import { Refresh } from 'grommet-icons'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'

function RefreshButton({ onClick }) {
  return (
    <Button
      label={
        <Box margin='xsmall'>
          <Refresh color='#000000' />
        </Box>}
      onClick={onClick}
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
