import React from 'react'
import HeaderButton from './HeaderButton'
import { Box } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'

export default function LayoutButtonContainer() {
  const onClick = e => { console.log('Layout Button Pressed') }
  return (
    <HeaderButton
      icon={
        <Box direction='row' gap='xxsmall'>
          <FontAwesomeIcon color='#555555' icon={faPause} size='xs' />
          <FontAwesomeIcon color='#555555' icon={faPause} rotation={90} size='xs' />
        </Box>
      }
      label={'Layout'}
      onClick={onClick}
    />
  )
}
