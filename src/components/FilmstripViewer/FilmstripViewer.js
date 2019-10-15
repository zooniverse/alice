import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FilmstripThumbnail from './components/FilmstripThumbnail'
import StepNavigation from './components/StepNavigation'
import { FormDown, FormUp } from 'grommet-icons'

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

function FilmstripViewer ({ images, isOpen, onToggle }) {
  const actionText = isOpen ? 'Collapse' : 'Expand';

  return (
    <Box background='#FFFFFF' pad='xsmall' round={{ size: 'xsmall', corner: 'top' }}>
      <Box direction='row' justify='between'>
        <Text>All pages</Text>
        {!isOpen && ( <StepNavigation steps={images} /> )}
        <Button
          icon={isOpen ? <FormDown /> : <FormUp />}
          label={<Uppercase>{actionText} Filmstrip</Uppercase>}
          gap='xsmall'
          onClick={onToggle}
          plain
          reverse />
      </Box>
      {isOpen && (
        <Box direction='row' margin={{ vertical: 'xsmall' }}>
          <Box border={{ color: '#979797' }} direction='row'>
            <FilmstripThumbnail src={images[0]}/>
            <FilmstripThumbnail rotationDegrees={90} src={images[1]}/>
          </Box>
          <Box direction='row'>
            {images.map((image, i) => <FilmstripThumbnail key={`THUMBNAIL_${i}`} src={image} /> )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

FilmstripViewer.defaultProps = {
  images: [],
  isOpen: true,
  onToggle: () => {}
}

FilmstripViewer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func
}

export default FilmstripViewer
