import React from 'react'
import { Box, Button, Image } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'

export default function FilmstripThumbnail ({ disabled, index, isActive, rotationDegrees, selectImage, src }) {
  const [isHover, onHover] = React.useState(false)

  return (
      <Button
        disabled={disabled}
        margin='xsmall'
        onBlur={() => onHover(false)}
        onClick={() => selectImage(index)}
        onFocus={() => onHover(true)}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Box height='xsmall' width='xsmall'>
          <ThumbnailBorder
            isActive={isActive}
            isHover={isHover}
            rotationDegrees={rotationDegrees}
          />
          <Image alt={`Subject Page ${index + 1}`} fit='cover' src={src} />
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
