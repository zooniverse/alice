import React from 'react'
import { Box, Button, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledText = styled(Text)`
  line-height: 1.75em;
`

export default function SubjectLockedModal() {
  return (
    <Box
      background='white'
      elevation='small'
      gap='xsmall'
      pad='small'
      round='xsmall'
      width='medium'
    >
      <Text size='large'>Subject locked</Text>
      <StyledText>
        This subject cannot be accessed because <b>Erin Green</b> is currently accessing it.
      </StyledText>
      <StyledText>For access, ask them to close their version.</StyledText>
      <Button label={<Text size='small'>BACK TO SUBJECT SET INDEX</Text>} plain />
    </Box>
  )
}
