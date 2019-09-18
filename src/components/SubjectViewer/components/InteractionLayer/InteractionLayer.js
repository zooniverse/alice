import React from 'react'
import { func } from 'prop-types'

function InteractionLayer({ onMouseMove, onMouseDown, onMouseUp }) {
  return (
    <rect
      id='InteractionLayer'
      width='100%'
      height='100%'
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
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
