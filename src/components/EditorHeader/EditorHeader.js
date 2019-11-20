import React from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Overlay from '../Overlay'
import Title from './components/Title'
import MetadataButton from './components/MetadataButton'
import Badge from '../Badge'

const StyledBox = styled(Box)`
  position: relative;
`

export default function EditorHeader ({ buttons, showMetadata, showOverlay }) {
  return (
    <Box as='header' border='bottom' direction='row' pad={{ bottom: 'small' }} justify='between'>
      <Box align='center' direction='row' gap='xsmall' wrap>
        <Title onEditor={showMetadata} />
        {showMetadata && <MetadataButton />}
      </Box>
      <StyledBox align='center' direction='row'>
        <Box direction='row' border='right' fill='vertical' gap='small' pad='small' wrap>
          {buttons.map((HeaderButton, i) => <HeaderButton key={`HEADER_BUTTON_${i}`} />)}
        </Box>
        <Badge />
        {showOverlay && <Overlay />}
      </StyledBox>
    </Box>
  )
}

EditorHeader.propTypes = {
  buttons: PropTypes.array,
  showMetadata: PropTypes.bool,
  showOverlay: PropTypes.bool
}

EditorHeader.defaultProps = {
  buttons: [],
  showMetadata: false,
  showOverlay: false
}
