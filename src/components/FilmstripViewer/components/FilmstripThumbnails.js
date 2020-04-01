import React from 'react'
import { Box } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripThumbnail from './FilmstripThumbnail'

const INTERVAL = 10

function FilmstripThumbnails (props) {
  const store = React.useContext(AppContext)
  const { slopeValues } = store.transcriptions
  const slopeGroup = (slopeValues.length && slopeValues[props.imageIndex])

  const rearrangeSlopes = () => {
    if (props.hoveredPage === props.imageIndex) {
      console.log(slopeGroup);
    }
    store.transcriptions.rearrangeSlopes()
  }

  if (!slopeGroup || !slopeGroup.slopes.length) return null

  return (
    <Box border={slopeGroup.slopes.length > 1} direction='row' margin={{ bottom: 'xsmall' }}>
      {slopeGroup.slopes.map((slope, index) => {
        const roundedSlope = INTERVAL * Math.round(slope.value/INTERVAL) || null
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
  src: string,
  subjectIndex: number
}

FilmstripThumbnails.defaultProps = {
  disabled: false,
  index: 0,
  isActiveSubject: false,
  selectImage: () => {},
  src: '',
  subjectIndex: 0
}

export default observer(FilmstripThumbnails)
