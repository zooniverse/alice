import React from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Overlay from '../Overlay'
import Title from './components/Title'
import Back from './components/Back'
import MetadataButton from './components/MetadataButton'
import Badge from '../Badge'

const HeaderBox = styled(Box)`
  min-height: 3.25em;
`

const StyledBox = styled(Box)`
  position: relative;
`

export default function EditorHeader ({ buttons, onAbout, showMetadata, showOverlay }) {
  return (
    <Box as='header' border='bottom' direction='row' pad={{ bottom: 'small' }} justify='between'>
      <HeaderBox align='center' direction='row' gap='xsmall' wrap>
        {onAbout ? <Back /> : <Title onEditor={showMetadata} />}
        {showMetadata && <MetadataButton />}
      </HeaderBox>
      <StyledBox align='center' background='light-2' direction='row'>
        <Box direction='row' border='right' fill='vertical' gap='small' pad='small' wrap>
          {buttons.map((HeaderButton, i) => <HeaderButton key={`HEADER_BUTTON_${i}`} disabled={showOverlay} />)}
        </Box>
        <Badge disabled={showOverlay} />
        {showOverlay && <Overlay />}
      </StyledBox>
    </Box>
  )
}

EditorHeader.propTypes = {
  buttons: PropTypes.array,
  onAbout: PropTypes.bool,
  showMetadata: PropTypes.bool,
  showOverlay: PropTypes.bool
}

EditorHeader.defaultProps = {
  buttons: [],
  onAbout: false,
  showMetadata: false,
  showOverlay: false
}
