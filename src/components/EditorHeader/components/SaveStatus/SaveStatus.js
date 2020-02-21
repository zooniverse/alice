import React from 'react'
import { string } from 'prop-types'
import { Box, Text } from 'grommet'
import ASYNC_STATES from 'helpers/asyncStates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export default function SaveStatus({ status }) {
  const showError = status === ASYNC_STATES.ERROR
  const color = showError ? '#FF0000' : '#5C5C5C'
  const text = showError ? 'CHANGES NOT SAVED' : 'ALL CHANGES SAVED'

  return (
    <Box align='center' direction='row' gap='xsmall'>
      {showError && <FontAwesomeIcon icon={faExclamation} color='#FF0000' size='xs' />}
      <Text color={color}>{text}</Text>
    </Box>
  )
}

SaveStatus.propTypes = {
  status: string,
}

SaveStatus.defaultProps = {
  status: ASYNC_STATES.IDLE,
}
