import React from 'react'
import { Box, Heading } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MetadataButton from './components/MetadataButton'
import Badge from '../Badge'

const StyledHeader = styled(Heading)`
  font-weight: 300;
`

export default function EditorHeader ({ buttons, showMetadata }) {
  return (
    <Box as='header' direction='row' pad={{ bottom: 'small' }} border='bottom'>
      <Box direction='row' justify='between' border='right' fill='horizontal'>
        <Box align='center' direction='row' gap='xsmall'>
          <StyledHeader level='2'>Text Transcription Project</StyledHeader>
          {showMetadata && <MetadataButton />}
        </Box>
        <Box align='center' direction='row' gap='small' pad={{ horizontal: 'medium' }} wrap>
          {buttons.map((HeaderButton, i) => <HeaderButton key={`HEADER_BUTTON_${i}`} />)}
        </Box>
      </Box>
      <Badge />
    </Box>
  )
}

EditorHeader.propTypes = {
  buttons: PropTypes.array,
  showMetadata: PropTypes.bool
}

EditorHeader.defaultProps = {
  buttons: [],
  showMetadata: false
}
