import React from 'react'
import { Box, DropButton, Text } from 'grommet'
import { FormDown } from 'grommet-icons'
import HeaderButton from '../HeaderButton'

export default function MoreButton({ disabled, toggleSettings }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropButton
      label={
        <Box align='center' direction='row'>
          <Text color="#5C5C5C">MORE</Text>
          <FormDown />
        </Box>
      }
      disabled={disabled}
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <Box background='white'>
          <HeaderButton label='Download Subject Data' margin='small' />
          <HeaderButton
            label='Edit Aggregation Settings'
            margin='small'
            onClick={() => {
              toggleSettings()
              setOpen(false)
            }}
          />
        </Box>
      }
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}
      open={open}
      plain
    />
  )
}
