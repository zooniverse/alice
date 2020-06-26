import React from 'react'
import { Box, Button, Image } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'
import styled, {css} from 'styled-components'

const StyledButton = styled(Button)`
  ${css`cursor: ${props => props.draggable ? 'move' : 'cursor'};`}
`

export default function FilmstripThumbnail ({
  disabled,
  draggable,
  hoveredIndex,
  index,
  isActive,
  page,
  rearrangePages,
  rotationDegrees,
  selectImage,
  setHoveredIndex,
  setSlopeValues,
  slopeDefinition,
  slopeIndex,
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
      <StyledButton
        disabled={disabled}
        draggable={draggable}
        margin='xsmall'
        onBlur={() => onHover(false)}
        onClick={() => selectImage(page, slopeIndex)}
        onFocus={() => onHover(true)}
        onDragEnd={() => {
          setHoveredIndex(null)
          rearrangePages()
        }}
        onDragEnter={(e) => handleDragEnter(e, index, hoveredIndex, setHoveredIndex, slopeValues, setSlopeValues)}
        onDragOver={(e) => stopEvents(e)}
        onDragStart={() => setHoveredIndex(index)}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Box height='xsmall' width='xsmall'>
          <ThumbnailBorder
            isActive={isActive}
            isHover={isHover}
            rotationDegrees={slopeDefinition}
          />
          <Image alt={`Subject Page ${page + 1}`} fit='cover' src={src} />
        </Box>
      </StyledButton>
  )
}

FilmstripThumbnail.propTypes = {
  disabled: bool,
  draggable: bool,
  index: number,
  isActive: bool,
  rotationDegrees: number,
  selectImage: func,
  src: string
}

FilmstripThumbnail.defaultProps = {
  disabled: false,
  draggable: true,
  index: 0,
  isActive: false,
  rotationDegrees: null,
  selectImage: () => {},
  src: ''
}
