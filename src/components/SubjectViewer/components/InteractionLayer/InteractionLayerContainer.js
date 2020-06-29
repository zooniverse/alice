import React from 'react'
import AppContext from 'store'
import InteractionLayer from './InteractionLayer'

let startingPos = { x: 0, y: 0 }

export default function InteractionLayerContainer({ boundingBox, disabled, height, width }) {
  const store = React.useContext(AppContext)
  const [isMoving, setMove] = React.useState(false)
  const onMouseDown = e => {
    if (disabled) return
    startingPos = { x: e.clientX, y: e.clientY }
    setMove(true)
  }
  const onMouseUp = e => {
    if (disabled) return
    setMove(false)
  }
  const onMouseMove = e => {
    if (disabled) return
    if (isMoving) {
      const difference = {
        x: (e.clientX - startingPos.x) / store.image.scale,
        y: (e.clientY - startingPos.y) / store.image.scale
      }
      startingPos = { x: e.clientX, y: e.clientY }
      store.image.setTranslate(difference)
    }
  }

  return (
    <InteractionLayer
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      height={height}
      width={width}
    />
  )
}
