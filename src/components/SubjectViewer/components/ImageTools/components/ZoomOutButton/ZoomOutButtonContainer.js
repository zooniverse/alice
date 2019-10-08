import React from 'react'
import AppContext from 'store'
import ZoomOutButton from './ZoomOutButton'

export default function ZoomOutButtonContainer() {
  const store = React.useContext(AppContext)
  return <ZoomOutButton onClick={store.image.zoomOut} />
}
