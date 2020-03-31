import React from 'react'
import { Box } from 'grommet'
import { array, bool, func, number, string } from 'prop-types'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripThumbnail from './FilmstripThumbnail'

const INTERVAL = 10

function FilmstripThumbnails (props) {
  const store = React.useContext(AppContext)

  const rearrangeSlopes = () => {
    if (props.hoveredPage === props.imageIndex) {
      console.log(props.slopeValues);
    }
    store.transcriptions.rearrangeSlopes()
  }

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
            rearrangeSlopes={rearrangeSlopes}
            imageIndex={props.imageIndex}
            isActive={isActive}
            isViewer={store.projects.isViewer}
            setHoveredPage={props.setHoveredPage}
            slope={roundedSlope}
            slopeIndex={index}
          />
      )})}
    </Box>
  )
}

FilmstripThumbnails.propTypes = {
  disabled: bool,
  index: number,
  isActiveSubject: bool,
  selectImage: func,
  slopeValues: array,
  src: string,
  subjectIndex: number
}

FilmstripThumbnails.defaultProps = {
  disabled: false,
  index: 0,
  isActiveSubject: false,
  selectImage: () => {},
  slopeValues: [],
  src: '',
  subjectIndex: 0
}

export default observer(FilmstripThumbnails)
