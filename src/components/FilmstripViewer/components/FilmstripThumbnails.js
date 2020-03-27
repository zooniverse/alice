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
        const isActive = props.isActiveSubject && index === props.activeSlopeIndex
        return (
          <FilmstripThumbnail
            {...props}
            key={`THUMBNAIL_${index}_${roundedSlope}`}
            imageSlopeIndex={index}
            isActive={isActive}
            slope={roundedSlope}
            slopeIndex={index}
          />
      )})}
    </Box>
  )
}

FilmstripThumbnails.propTypes = {
  disabled: bool,
  subjectIndex: number,
  isActiveSubject: bool,
  selectImage: func,
  slopeValues: array,
  src: string
}

FilmstripThumbnails.defaultProps = {
  disabled: false,
  subjectIndex: 0,
  isActiveSubject: false,
  selectImage: () => {},
  slopeValues: [],
  src: ''
}

export default observer(FilmstripThumbnails)
