import React from 'react'
import { Revert } from 'grommet-icons'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'

function ResetButton({ onClick }) {
  return (
    <Button
      label={
        <Box margin='xsmall'>
          <Revert color='#000000' />
        </Box>}
      onClick={onClick}
      plain
    />
  )
}

ResetButton.propTypes = {
  onClick: PropTypes.func
}

ResetButton.defaultProps = {
  onClick: () => {}
}

export default ResetButton
