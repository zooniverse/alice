import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledText = styled(Text)`
  line-height: 1.75em;
`

export default function UnapproveModal() {
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
        <FontAwesomeIcon icon={faTimesCircle} size='xs' />
      </Box>
      <StyledText>
        By unapproving this subject, the subject's data will be unavailable for
        future downloads until re-marked as approved.
      </StyledText>
      <StyledText>This action can be reversed at any time.</StyledText>
      <Box direction='row' justify='between' margin={{ top: 'small' }}>
        <Button label={<Text size='small'>CLOSE AND CANCEL</Text>} plain />
        <Button label={<Text size='small'>YES, UNAPPROVE</Text>} plain />
      </Box>
    </Box>
  )
}
