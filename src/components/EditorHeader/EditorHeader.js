import React from 'react'
import { Box, Heading } from 'grommet'
import Badge from '../Badge'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledHeader = styled(Heading)`
  font-weight: 300;
`

export default function EditorHeader ({ buttons }) {
  return (
    <Box as='header' direction='row' pad={{ bottom: 'small' }} border='bottom'>
      <Box direction='row' justify='between' border='right' fill='horizontal'>
        <Box align='center'>
          <StyledHeader level='2'>Text Transcription Project</StyledHeader>
        </Box>
        <Box align='center' direction='row' gap='small' pad={{ horizontal: 'medium' }}>
          {buttons.map((HeaderButton, i) => <HeaderButton key={`HEADER_BUTTON_${i}`} />)}
        </Box>
      </Box>
      <Badge />
    </Box>
  )
}

EditorHeader.propTypes = {
  buttons: PropTypes.array
}

EditorHeader.defaultProps = {
  buttons: []
}
