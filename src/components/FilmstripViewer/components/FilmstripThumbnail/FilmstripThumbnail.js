import React from 'react'
import { Box, Button, Image } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import ThumbnailBorder from './ThumbnailBorder'

export default function FilmstripThumbnail ({ disabled, index, isActive, rotationDegrees, selectImage, src }) {
  return (
      <Button disabled={disabled} margin='xsmall' onClick={() => selectImage(index)}>
        <Box height='xsmall' width='xsmall'>
          {isActive && (
            <ThumbnailBorder rotationDegrees={rotationDegrees} />
          )}
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
