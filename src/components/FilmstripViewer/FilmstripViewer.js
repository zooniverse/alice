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

function FilmstripViewer ({ subjectIndex, images, isOpen, onToggle }) {
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
          <Box direction='row'>
            {images.map((image, i) => {
              const isActive = i === subjectIndex
              return (
                <FilmstripThumbnail
                  key={`THUMBNAIL_${i}`}
                  index={i}
                  isActive={isActive}
                  src={image}
                />
              )
            })}
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
