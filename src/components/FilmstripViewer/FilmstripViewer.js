import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FilmstripThumbnail from './components/FilmstripThumbnail'
import StepNavigation from './components/StepNavigation'
import { FormDown, FormUp } from 'grommet-icons'

const RoundedBox = styled(Box)`
  border-radius: 0.25em 0.25em 0 0;
`

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

function FilmstripViewer ({ images, isOpen, onToggle }) {
  const actionText = isOpen ? 'Collapse' : 'Expand';


  return (
    <RoundedBox background='#FFFFFF' pad='small'>
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
            <FilmstripThumbnail src={images[2]}/>
            <FilmstripThumbnail src={images[3]}/>
            <FilmstripThumbnail src={images[4]}/>
            <FilmstripThumbnail src={images[5]}/>
          </Box>
        </Box>
      )}
    </RoundedBox>
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
