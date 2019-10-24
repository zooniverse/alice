import React from 'react'
import { Box, DropButton, Text } from 'grommet'
import { FormDown, FormUp } from 'grommet-icons'
import { bool, func } from 'prop-types'
import HeaderButton from '../HeaderButton'

export default function MoreButton({ isOpen, setOpen }) {
  const Icon = isOpen ? FormDown : FormUp

  return (
    <DropButton
      label={
        <Box align='center' direction='row'>
          <Text color='#5C5C5C'>MORE</Text>
          <Icon />
        </Box>
      }
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <Box background='white' gap='small' pad='small'>
          <HeaderButton label='Download Subject Data' />
          <HeaderButton label='Edit Aggregation Settings' />
        </Box>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={isOpen}
      plain
    />
  )
}

MoreButton.propTypes = {
  isOpen: bool,
  setOpen: func
}

MoreButton.defaultProps = {
  isOpen: false,
  setOpen: () => {}
}
