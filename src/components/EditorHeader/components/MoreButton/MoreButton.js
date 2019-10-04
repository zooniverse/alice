import React from 'react'
import { Box, DropButton, Text } from 'grommet'
import { FormUp } from 'grommet-icons'
import HeaderButton from '../HeaderButton'

export default function MoreButton() {
  return (
    <DropButton
      label={
        <Box align='center' direction='row'>
          <Text>MORE</Text>
          <FormUp />
        </Box>
      }
      dropAlign={{ top: 'bottom', right: 'left' }}
      dropContent={
        <Box background='white' gap='small' pad='small'>
          <HeaderButton label='Download Subject Data' />
          <HeaderButton label='Edit Aggregation Settings' />
        </Box>
      }
      plain
    />
  )
}
