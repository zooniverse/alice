import React from 'react'
import { Box, Button, Image } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'

const INTERVAL = 10

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
  hoveredSlope,
  rearrangeSlopes,
  rotationDegrees,
  selectImage,
  setHoveredSlope,
  slope,
  slopeIndex,
  src
}) {
  const handleRearrangingSlopes = (droppedSlope) => {
    rearrangeSlopes(hoveredSlope, droppedSlope)
  }
  const roundedSlope = INTERVAL * Math.round(slope.value/INTERVAL) || null

  return (
      <Button
        disabled={disabled}
        draggable={!isViewer}
        onDragEnd={() => {
          handleRearrangingSlopes(slope)
          setHoveredSlope(null)
        }}
        onDragEnter={() => {
          setHoveredSlope(slope)
        }}
        onDragOver={(e) => stopEvents(e)}
        margin='xsmall'
        onClick={() => selectImage(imageIndex, slopeIndex)}
      >
        <Box height='xsmall' width='xsmall'>
          <ThumbnailBorder
            isActive={isActive}
            rotationDegrees={roundedSlope}
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
