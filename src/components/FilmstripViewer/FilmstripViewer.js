import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormDown, FormUp } from 'grommet-icons'
import { observer } from 'mobx-react'
import FilmstripThumbnails from './components/FilmstripThumbnails'
import StepNavigation from '../StepNavigation'
import Overlay from '../Overlay'

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

const RelativeBox = styled(Box)`
  position: relative;
`

function FilmstripViewer ({
  activeSlopeIndex,
  disabled,
  images,
  isOpen,
  selectImage,
  setOpen,
  subjectIndex
}) {
  const actionText = isOpen ? 'Collapse' : 'Expand';
  const [hoveredPage, setHoveredPage] = React.useState()

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
          <Box direction='row' gap='small' wrap>
            {images.map((image, i) => {
              const isActive = i === subjectIndex
              return (
                <FilmstripThumbnails
                  key={`THUMBNAILS_${i}`}
                  activeSlopeIndex={activeSlopeIndex}
                  disabled={disabled}
                  imageIndex={i}
                  hoveredPage={hoveredPage}
                  setHoveredPage={setHoveredPage}
                  isActiveSubject={isActive}
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

export default observer(FilmstripViewer)
