import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormDown, FormUp } from 'grommet-icons'
import FilmstripThumbnail from './components/FilmstripThumbnail'
import StepNavigation from './components/StepNavigation'
import Overlay from '../Overlay'

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

const RelativeBox = styled(Box)`
  position: relative;
`

function FilmstripViewer ({ disabled, selectImage, subjectIndex, images, isOpen, setOpen }) {
  const actionText = isOpen ? 'Collapse' : 'Expand';

  return (
    <RelativeBox background='#FFFFFF' pad='xsmall' round={{ size: 'xsmall', corner: 'top' }}>
      {disabled && <Overlay />}
      <Box direction='row' justify='between'>
        <Text>All pages</Text>
        {!isOpen && (
          <StepNavigation
            activeStep={subjectIndex}
            disabled={disabled}
            setStep={selectImage}
            steps={images}
          /> )}
        <Button
          disabled={disabled}
          icon={isOpen ? <FormDown /> : <FormUp />}
          label={<Uppercase>{actionText} Filmstrip</Uppercase>}
          gap='xsmall'
          onClick={() => { setOpen(!isOpen) }}
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
                  disabled={disabled}
                  index={i}
                  isActive={isActive}
                  selectImage={selectImage}
                  src={image}
                />)
            })}
          </Box>
      )}
    </RelativeBox>
  )
}

FilmstripViewer.defaultProps = {
  disabled: false,
  images: [],
  isOpen: true,
  selectImage: () => {},
  setOpen: () => {},
  subjectIndex: 0
}

FilmstripViewer.propTypes = {
  disabled: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool,
  selectImage: PropTypes.func,
  setOpen: PropTypes.func,
  subjectIndex: PropTypes.number
}

export default FilmstripViewer
