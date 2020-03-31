import React from 'react'
import { Box, Button, Image } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'

function stopEvents(e) {
  e.preventDefault()
  e.stopPropagation()
}

export default function FilmstripThumbnail ({
  disabled,
  imageIndex,
  index,
  isActive,
  isViewer,
  rearrangeSlopes,
  rotationDegrees,
  selectImage,
  setHoveredPage,
  slope,
  slopeIndex,
  src
}) {
  return (
      <Button
        disabled={disabled}
        draggable={!isViewer}
        onDragEnd={() => {
          rearrangeSlopes()
          setHoveredPage(null)
        }}
        onDragEnter={() => setHoveredPage(imageIndex)}
        onDragOver={(e) => stopEvents(e)}
        onDragStart={() => console.log('START', slopeIndex)}
        margin='xsmall'
        onClick={() => selectImage(index, slopeIndex)}
      >
        <Box height='xsmall' width='xsmall'>
          <ThumbnailBorder
            isActive={isActive}
            rotationDegrees={slope}
          />
          <Image alt={`Subject Page ${index + 1}`} fit='cover' src={src} />
        </Box>
      </Button>
  )
}

FilmstripThumbnail.propTypes = {
  disabled: bool,
  imageIndex: number,
  index: number,
  isActive: bool,
  isViewer: bool,
  rearrangeSlopes: func,
  rotationDegrees: number,
  selectImage: func,
  src: string
}

FilmstripThumbnail.defaultProps = {
  disabled: false,
  imageIndex: 0,
  index: 0,
  isActive: false,
  isViewer: false,
  rearrangeSlopes: () => {},
  rotationDegrees: null,
  selectImage: () => {},
  src: ''
}
