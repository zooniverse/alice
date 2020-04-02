import React from 'react'
import { Box, Button, Image } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'

export default function FilmstripThumbnail ({
  disabled,
  hoveredIndex,
  index,
  isActive,
  page,
  rotationDegrees,
  selectImage,
  setHoveredIndex,
  setSlopeValues,
  slopeIndex,
  slopeKey,
  slopeValues,
  src
}) {
  const [isHover, onHover] = React.useState(false)

  function handleDragEnter(e, dragIndex, hoveredIndex, setHoveredIndex, slopes, rearrangeSlopes) {
    e.preventDefault()
    let copiedArray = slopes.slice()
    const itemToMove = copiedArray.splice(hoveredIndex, 1)[0]
    copiedArray.splice(dragIndex,0,itemToMove)
    setHoveredIndex(dragIndex)
    rearrangeSlopes(copiedArray)
  }

  function stopEvents(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
      <Button
        disabled={disabled}
        draggable
        margin='xsmall'
        onBlur={() => onHover(false)}
        onClick={() => selectImage(page, slopeIndex)}
        onFocus={() => onHover(true)}
        onDragEnd={() => setHoveredIndex(null)}
        onDragOver={(e) => stopEvents(e)}
        onDragEnter={(e) => handleDragEnter(e, index, hoveredIndex, setHoveredIndex, slopeValues, setSlopeValues)}
        onDragStart={() => setHoveredIndex(index)}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Box height='xsmall' width='xsmall'>
          {isActive && (
            <ThumbnailBorder
              isActive={isActive}
              isHover={isHover}
              rotationDegrees={rotationDegrees}
            />
          )}
          <Image alt={`Subject Page ${page + 1}`} fit='cover' src={src} />
        </Box>
      </Button>
  )
}

FilmstripThumbnail.propTypes = {
  disabled: bool,
  index: number,
  isActive: bool,
  rotationDegrees: number,
  selectImage: func,
  src: string
}

FilmstripThumbnail.defaultProps = {
  disabled: false,
  index: 0,
  isActive: false,
  rotationDegrees: null,
  selectImage: () => {},
  src: ''
}
