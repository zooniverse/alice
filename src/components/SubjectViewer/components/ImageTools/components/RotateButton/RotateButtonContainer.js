import React from 'react'
import AppContext from 'store'
import RotateButton from './RotateButton'

export default function RotateButtonContainer() {
  const store = React.useContext(AppContext)
  return <RotateButton onClick={store.image.rotate} />
}
