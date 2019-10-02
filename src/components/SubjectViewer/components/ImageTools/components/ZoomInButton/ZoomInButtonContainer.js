import React from 'react'
import AppContext from 'store'
import ZoomInButton from './ZoomInButton'

export default function ZoomInButtonContainer() {
  const store = React.useContext(AppContext)
  return <ZoomInButton onClick={store.image.zoomIn} />
}
