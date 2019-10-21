import React from 'react'
import AppContext from 'store'
import MoreButton from './MoreButton'

export default function MoreButtonContainer() {
  const store = React.useContext(AppContext)
  const toggleSettings = store.aggregations.toggleSettings

  return <MoreButton toggleSettings={toggleSettings} />
}
