import React from 'react'
import { Box, Button, Image, Text } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'
import styled, {css} from 'styled-components'

export const DeleteButton = styled(Button)`
  background: white;
  border: 1px solid #5c5c5c;
  border-radius: 100%;
  box-shadow: 0px 5px 12px grey;
  height: 1rem;
  width: 1rem;
  position: absolute;
  left: -6px;
  text-align: center;
  top: -8px;
  z-index: 1;

  span {
    vertical-align: super;
  }

  &:focus {
    box-shadow: 0 0 2px 2px #addde0;
  }
`

export const StyledButton = styled(Button)`
  ${css`cursor: ${props => props.draggable ? 'move' : 'cursor'};`}
  position: relative;
`

export default function FilmstripThumbnail ({
  canDelete,
  disabled,
  draggable,
  hoveredIndex,
  index,
  isActive,
  page,
  rearrangePages,
  selectImage,
  setHoveredIndex,
  setSlopeValues,
  showDeletePage,
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
          {canDelete && (
            <DeleteButton
              label={<Text size='0.75rem'>X</Text>}
              onClick={showDeletePage}
              plain
            />
          )}
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
  canDelete: bool,
  disabled: bool,
  draggable: bool,
  index: number,
  isActive: bool,
  selectImage: func,
  showDeletePage: func,
  src: string
}

FilmstripThumbnail.defaultProps = {
  canDelete: false,
  disabled: false,
  draggable: true,
  index: 0,
  isActive: false,
  selectImage: () => {},
  showDeletePage: () => {},
  src: ''
}
