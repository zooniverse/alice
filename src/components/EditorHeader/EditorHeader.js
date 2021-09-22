import { Box } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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

export default function EditorHeader ({ buttons, disabled, onAbout, showMetadata, user }) {
  return (
    <Box as='header' border='bottom' direction='row' pad={{ bottom: 'small' }} justify='between'>
      <HeaderBox align='center' direction='row' gap='xsmall' wrap>
        {onAbout ? <Back user={user} /> : <Title onEditor={showMetadata} />}
        {showMetadata && <MetadataButton />}
      </HeaderBox>
      {!!user && (
        <StyledBox align='center' background='light-2' direction='row'>
            <Box direction='row' border='right' fill='vertical' gap='small' pad='small' wrap>
              {buttons.map((HeaderButton, i) => <HeaderButton key={`HEADER_BUTTON_${i}`} disabled={disabled} />)}
            </Box>
            <Badge onAbout={onAbout} />
        </StyledBox>
      )}
    </Box>
  )
}

EditorHeader.propTypes = {
  buttons: PropTypes.array,
  onAbout: PropTypes.bool,
  showMetadata: PropTypes.bool,
  showOverlay: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string
  })
}

EditorHeader.defaultProps = {
  buttons: [],
  onAbout: false,
  showMetadata: false,
  showOverlay: false,
  user: null
}
