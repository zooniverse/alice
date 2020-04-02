import React from 'react'
import { Box, Button, Text } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { FormDown, FormUp } from 'grommet-icons'
import { getPage, getSlopeLabel } from 'helpers/slopeHelpers'
import FilmstripThumbnail from './components/FilmstripThumbnail'
import StepNavigation from '../StepNavigation'
import Overlay from '../Overlay'

const Uppercase = styled(Text)`
  text-transform: uppercase;
`

const RelativeBox = styled(Box)`
  position: relative;
`

function FilmstripViewer ({
  activeSlope,
  disabled,
  images,
  isOpen,
  selectImage,
  setOpen,
  slopeKeys,
  subjectIndex
}) {
  const actionText = isOpen ? 'Collapse' : 'Expand';
  const [slopeValues, setSlopeValues] = React.useState(slopeKeys)
  const [hoveredIndex, setHoveredIndex] = React.useState()

  return (
    <RelativeBox background='#FFFFFF' pad='xsmall' round={{ size: 'xsmall', corner: 'top' }}>
      {disabled && <Overlay />}
      <Box direction='row' justify='between'>
        <Text size='1em'>All Pages</Text>
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
          <Box direction='row' wrap>
            {slopeValues.map((key, i) => {
              const page = getPage(key)
              const slopeIndex = getSlopeLabel(key)
              const image = images[page]
              const isActive = page === subjectIndex && slopeIndex === activeSlope
              return (
                <FilmstripThumbnail
                  key={`THUMBNAIL_${i}`}
                  disabled={disabled}
                  hoveredIndex={hoveredIndex}
                  index={i}
                  isActive={isActive}
                  page={page}
                  selectImage={selectImage}
                  setHoveredIndex={setHoveredIndex}
                  setSlopeValues={setSlopeValues}
                  slopeIndex={slopeIndex}
                  slopeKey={key}
                  slopeValues={slopeValues}
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
