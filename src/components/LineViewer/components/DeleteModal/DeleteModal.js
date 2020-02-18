import React from 'react'
import { Box, Button, Text } from 'grommet'
import { func } from 'prop-types'
import styled from 'styled-components'

const AbsoluteBox = styled(Box)`
  background: #ffffff;
  opacity: 90%;
  position: absolute;
  z-index: 1;
`

export default function DeleteModal({ deleteLine, toggleModal }) {
  const onDeleteLine = () => {
    deleteLine()
    toggleModal()
  }
  const onToggleModal = () => toggleModal()

  return (
    <AbsoluteBox
      align='center'
      fill
      justify='center'
      round='xsmall'
    >
      <Box gap='medium'>
        <Box>
          <Text weight='bold'>Are you sure?</Text>
          <Text>Delete this entire line of transcribed text?</Text>
        </Box>
        <Box direction='row' justify='between'>
          <Button
            label={<Text size='small'>DON'T DELETE</Text>}
            onClick={onToggleModal}
            plain
          />
          <Button
            label={<Text size='small'>YES, DELETE LINE</Text>}
            onClick={onDeleteLine}
            plain
          />
        </Box>
      </Box>
    </AbsoluteBox>
  )
}

DeleteModal.propTypes = {
  deleteLine: func,
  toggleModal: func
}

DeleteModal.defaultProps = {
  deleteLine: () => {},
  toggleModal: () => {}
}
