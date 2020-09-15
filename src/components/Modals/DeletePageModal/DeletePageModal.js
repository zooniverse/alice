import React from 'react'
import { Box, Button, Text } from 'grommet'
import { func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledText = styled(Text)`
  line-height: 1.5rem;
`

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

export default function DeletePageModal({ onClose, onDelete }) {
  return (
    <Box
      background='white'
      elevation='small'
      gap='xsmall'
      pad='small'
      round='xsmall'
      width='medium'
    >
      <Box direction='row' gap='small' justify='between'>
        <Text size='large'>Delete this page?</Text>
        <Button
          a11yTitle="Close Delete Page Modal"
          icon={<FontAwesomeIcon icon={faTimesCircle} size='xs' />}
          onClick={onClose}
          plain
        />
      </Box>

      <StyledText>
        The selected page contains transcribed text data. Are you sure
        you want to delete it?
      </StyledText>
      <StyledText>
        This action can be undone using the Undo button in the toolbar.
      </StyledText>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button
          a11yTitle="Close Delete Page Modal"
          label={<Uppercase size='small'>Cancel</Uppercase>}
          onClick={onClose}
          plain
        />
        <Button
          a11yTitle="Delete Selected Page"
          label={<Uppercase size='small'>Yes, Delete</Uppercase>}
          onClick={onDelete}
          plain
        />
      </Box>
    </Box>
  )
}

DeletePageModal.defaultProps = {
  onClose: () => {},
  onDelete: () => {}
}

DeletePageModal.propTypes = {
  onClose: func,
  onDelete: func
}