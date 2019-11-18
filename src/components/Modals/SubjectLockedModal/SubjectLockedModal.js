import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import { func } from 'prop-types'

const StyledText = styled(Text)`
  line-height: 1.75em;
`

export default function SubjectLockedModal({ onBack }) {
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
      <Button
        a11yTitle="Return to Subject Set Index Page"
        label={<Text size='small'>BACK TO SUBJECT SET INDEX</Text>}
        onClick={onBack}
        plain
      />
    </Box>
  )
}

SubjectLockedModal.propTypes = {
  onBack: func
}

SubjectLockedModal.defaultProps = {
  onBack: () => {}
}
