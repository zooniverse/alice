import React from 'react'
import { func } from 'prop-types'

function InteractionLayer({ onMouseDown, onMouseMove, onMouseUp, height, width }) {
  return (
    <rect
      id='InteractionLayer'
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      fill='transparent'
      x={width * -0.5}
      y={height * -0.5}
    />
  )
}

InteractionLayer.propTypes = {
  onMouseMove: func,
  onMouseDown: func,
  onMouseUp: func
}

export default InteractionLayer
