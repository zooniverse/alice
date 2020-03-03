import React from 'react'
import FlagButton from './FlagButton'

export default function SeenButtonContainer({ disabled, reduction, tag }) {
  const [showFlag, onShowFlag] = React.useState(false)
  const setFlag = () => reduction.toggleCurrentSeen()

  return (
    <FlagButton
      disabled={disabled}
      seenButton
      onShowFlag={onShowFlag}
      setFlag={setFlag}
      showFlag={showFlag}
      tag={tag}
    />
  )
}
