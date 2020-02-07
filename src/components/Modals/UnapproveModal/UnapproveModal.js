import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { func } from 'prop-types'

const StyledText = styled(Text)`
  line-height: 1.75em;
`

export default function UnapproveModal({ onClose, onUnapprove }) {
  return (
    <Box
      background='white'
      elevation='small'
      gap='xsmall'
      pad='small'
      round='xsmall'
      width='medium'
    >
      <Box direction='row' justify='between'>
        <Text size='large'>Unapprove subject data</Text>
        <Button
          a11yTitle="Close Unapprove Subject Modal"
          label={<FontAwesomeIcon icon={faTimesCircle} size='xs' />}
          onClick={onClose}
          plain
        />
      </Box>
      <StyledText>
        By unapproving this subject, the subject's data will be unavailable for
        future downloads until re-marked as approved.
      </StyledText>
      <StyledText>This action can be reversed at any time.</StyledText>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button
          a11yTitle="Close Unapprove Subject Modal"
          label={<Text size='small'>CLOSE AND CANCEL</Text>}
          onClick={onClose}
          plain
        />
        <Button
          a11yTitle="Confirm to Unapprove Subject"
          label={<Text size='small'>YES, UNAPPROVE</Text>}
          onClick={onUnapprove}
          plain
        />
      </Box>
    </Box>
  )
}

UnapproveModal.propTypes = {
  onClose: func,
  onUnapprove: func
}

UnapproveModal.defaultProps = {
  onClose: () => {},
  onUnapprove: () => {}
}
