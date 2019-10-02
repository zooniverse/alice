import React from 'react'
import { func } from 'prop-types'

function InteractionLayer({ onMouseDown, onMouseMove, onMouseUp }) {
  return (
    <rect
      id='InteractionLayer'
      width='100%'
      height='100%'
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      fill='transparent'
    />
  )
}

InteractionLayer.propTypes = {
  onMouseMove: func,
  onMouseDown: func,
  onMouseUp: func
}

export default InteractionLayer
