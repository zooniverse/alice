import React from 'react'
import FlagButton from './FlagButton'
import AppContext from 'store'

export default function FlagButtonContainer() {
  const store = React.useContext(AppContext)
  const [showFlag, onShowFlag] = React.useState(false)
  const setFlag = () => store.transcriptions.toggleCurrentFlag()

  return (
    <FlagButton
      onShowFlag={onShowFlag}
      setFlag={setFlag}
      showFlag={showFlag}
    />
  )
}
