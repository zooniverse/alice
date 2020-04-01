import React from 'react'
import { Box } from 'grommet'
import { bool, func, number, string } from 'prop-types'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripThumbnail from './FilmstripThumbnail'

function FilmstripThumbnails (props) {
  const store = React.useContext(AppContext)
  const { slopeValues } = store.transcriptions
  const slopeGroup = (slopeValues.length && slopeValues[props.imageIndex])

  if (!slopeGroup || !slopeGroup.slopes.length) return null

  return (
    <Box border={slopeGroup.slopes.length > 1} direction='row' margin={{ bottom: 'xsmall' }}>
      {slopeGroup.slopes.map((slope, index) => {
        const isActive = props.isActiveSubject && index === props.activeSlopeIndex
        return (
          <FilmstripThumbnail
            {...props}
            key={`THUMBNAIL_${index}`}
            hoveredSlope={props.hoveredSlope}
            imageIndex={props.imageIndex}
            isActive={isActive}
            isViewer={store.projects.isViewer}
            selectImage={props.selectImage}
            setHoveredSlope={props.setHoveredSlope}
            slope={slope}
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
