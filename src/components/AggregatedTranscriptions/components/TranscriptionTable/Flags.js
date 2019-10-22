import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { shape } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
`

function Flags({ datum }) {
  return (
    <Box direction='row' gap='xsmall'>
      <Box align='center' direction='row' justify='center' width='3em'>
        {datum.reviewed && <StyledFontAwesomeIcon color='green' icon={faCircle} size='xs' />}
        {datum.flagged && <StyledFontAwesomeIcon color='tomato' icon={faCircle} size='xs' />}
      </Box>
      <Box width='1em'>
        {datum.goldStandard && <FontAwesomeIcon color='gold' icon={faStar} size='xs' />}
      </Box>
    </Box>
  )
}

Flags.propTypes = {
  datum: shape()
}

Flags.defaultProps = {
  datum: {}
}

export { Flags, StyledFontAwesomeIcon }
