import React from 'react'
import { Box, DropButton, Text } from 'grommet'
import { FormDown } from 'grommet-icons'
import HeaderButton from '../HeaderButton'

export default function MoreButton() {
  return (
    <DropButton
      label={
        <Box align='center' direction='row'>
          <Text>MORE</Text>
          <FormDown />
        </Box>
      }
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <Box background='white'>
          <HeaderButton label='Download Subject Data' margin='small' />
          <HeaderButton label='Edit Aggregation Settings' margin='small' />
        </Box>
      }
      plain
    />
  )
}
