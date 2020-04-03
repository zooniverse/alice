import React from 'react'
import { Box, Button, Text } from 'grommet'
import { bool, func } from 'prop-types'

export default function SubjectViewerHeader({ disabled, linesVisible, toggleLineVisibility }) {
  const text = linesVisible ? 'HIDE ALL LINES' : 'VIEW ALL LINES'

  return (
    <Box background={{ color: 'white' }} round={{ size: 'xsmall', corner: 'top' }} pad='xsmall'>
      <Box align='center' direction='row' justify='between'>
        <Text size='1em'>Original Subject</Text>
        <Box direction='row' gap='small'>
          <Button
            disabled={disabled}
            label={<Text>{text}</Text>}
            onClick={toggleLineVisibility}
            plain
          />
        </Box>
      </Box>
    </Box>
  )
}

SubjectViewerHeader.propTypes = {
  disabled: bool,
  linesVisible: bool,
  toggleLineVisibility: func
}

SubjectViewerHeader.defaultProps = {
  disabled: false,
  linesVisible: true,
  toggleLineVisibility: () => {}
}
