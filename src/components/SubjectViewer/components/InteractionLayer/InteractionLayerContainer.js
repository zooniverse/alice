import React from 'react'
import AppContext from 'store'
import InteractionLayer from './InteractionLayer'

export default function InteractionLayerContainer({ boundingBox, disabled }) {
  const store = React.useContext(AppContext)
  const [isMoving, setMove] = React.useState(false)
  const [currentPosition, setCurrentPosition] = React.useState({ x:0, y:0 })
  const onMouseDown = e => {
    if (disabled) return
    setCurrentPosition({ x: e.clientX, y: e.clientY })
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
        x: (e.clientX - currentPosition.x) / store.image.scale,
        y: (e.clientY - currentPosition.y) / store.image.scale
      }
      setCurrentPosition({ x: e.clientX, y: e.clientY });
      store.image.setTranslate(difference)
    }
  }

  return (
    <InteractionLayer
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  )
}
