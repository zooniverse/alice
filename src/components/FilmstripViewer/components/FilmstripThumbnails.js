import React from 'react'
import { Box } from 'grommet'
import { array, bool, func, number, string } from 'prop-types'
import { observer } from 'mobx-react'
import FilmstripThumbnail from './FilmstripThumbnail'

const INTERVAL = 10

function FilmstripThumbnails (props) {
  return (
    <Box border={props.slopeValues.length > 1} direction='row' margin={{ bottom: 'xsmall' }}>
      {props.slopeValues.map((slope, index) => {
        const roundedSlope = INTERVAL * Math.round(slope/INTERVAL) || null
        return (
          <FilmstripThumbnail
            {...props}
            key={`FILM_THUMB_${index}`}
            imageSlopeIndex={index}
            slope={roundedSlope}
          />
      )})}
    </Box>
  )
}

FilmstripThumbnails.propTypes = {
  disabled: bool,
  index: number,
  isActive: bool,
  selectImage: func,
  slopeValues: array,
  src: string
}

FilmstripThumbnails.defaultProps = {
  disabled: false,
  index: 0,
  isActive: false,
  selectImage: () => {},
  slopeValues: [],
  src: ''
}

export default observer(FilmstripThumbnails)
