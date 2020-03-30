import React from 'react'
import { Box, DropButton, Text } from 'grommet'
import { FormDown, FormUp } from 'grommet-icons'
import { bool, func } from 'prop-types'
import AppContext from 'store'
import HeaderButton from '../HeaderButton'

export default function MoreButton({
  disabled,
  disableEditingAggregations,
  isOpen,
  setOpen,
  toggleDownload
}) {
  const store = React.useContext(AppContext)
  const Icon = isOpen ? FormUp : FormDown
  const onEditSettings = () => {
    setOpen(false)
    store.aggregations.toggleModal()
  }
  const onDownload = () => {
    setOpen(false)
    toggleDownload()
  }

  return (
    <DropButton
      label={
        <Box align='center' direction='row'>
          <Text color='#5C5C5C'>MORE</Text>
          <Icon />
        </Box>
      }
      disabled={disabled}
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <Box background='white' gap='small' pad='small'>
          <HeaderButton disabled={!disableEditingAggregations} label='Download Subject Data' onClick={onDownload} />
          <HeaderButton disabled={disableEditingAggregations} label='Edit Aggregation Settings' onClick={onEditSettings} />
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
  disabled: bool,
  disableEditingAggregations: bool,
  isOpen: bool,
  setOpen: func,
  toggleDownload: func
}

MoreButton.defaultProps = {
  disabled: false,
  disableEditingAggregations: false,
  isOpen: false,
  setOpen: () => {},
  toggleDownload: () => {}
}
