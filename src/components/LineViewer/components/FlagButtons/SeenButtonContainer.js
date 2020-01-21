import React from 'react'
import FlagButton from './FlagButton'
import AppContext from 'store'

export default function SeenButtonContainer() {
  const store = React.useContext(AppContext)
  const [showFlag, onShowFlag] = React.useState(false)
  const setFlag = () => store.transcriptions.toggleCurrentSeen()

  return (
    <FlagButton
      seenButton
      onShowFlag={onShowFlag}
      setFlag={setFlag}
      showFlag={showFlag}
    />
  )
}
