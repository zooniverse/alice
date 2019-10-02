import React from 'react'
import AppContext from 'store'
import InteractionLayer from './InteractionLayer'

export default function InteractionLayerContainer() {
  const store = React.useContext(AppContext)
  const [isMoving, setMove] = React.useState(false)
  const onMouseDown = e => setMove(true)
  const onMouseUp = e => setMove(false)
  const onMouseMove = e => {
    if (isMoving) {
      store.image.setTranslate()
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
