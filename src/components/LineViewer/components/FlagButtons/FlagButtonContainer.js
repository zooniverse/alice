import React from 'react'
import FlagButton from './FlagButton'

export default function FlagButtonContainer({ disabled, reduction, tag }) {
  const [showFlag, onShowFlag] = React.useState(false)
  const setFlag = () => reduction.toggleCurrentFlag()

  return (
    <FlagButton
      disabled={disabled}
      onShowFlag={onShowFlag}
      setFlag={setFlag}
      showFlag={showFlag}
      tag={tag}
    />
  )
}
