import React from 'react'
import { Box, Button, Text } from 'grommet'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function SubjectViewerHeader({ linesVisible, toggleLineVisibility }) {
  const text = linesVisible ? 'Hide All Lines' : 'View All Lines'

  return (
    <Box background={{ color: 'white' }} round={{ size: 'xsmall', corner: 'top' }} pad='xsmall'>
      <Box direction='row' justify='between'>
        <Text>Original Subject</Text>
        <Box direction='row' gap='small'>
          <Button
            label={<CapitalText>{text}</CapitalText>}
            onClick={toggleLineVisibility}
            plain
          />
        </Box>
      </Box>
    </Box>
  )
}

SubjectViewerHeader.propTypes = {
  linesVisible: bool,
  toggleLineVisibility: func
}

SubjectViewerHeader.defaultProps = {
  linesVisible: true,
  toggleLineVisibility: () => {}
}

export default SubjectViewerHeader
