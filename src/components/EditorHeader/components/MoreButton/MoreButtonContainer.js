import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import MoreButton from './MoreButton'

function MoreButtonContainer() {
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showSettings
  const toggleSettings = store.aggregations.toggleSettings

  return <MoreButton disabled={disabled} toggleSettings={toggleSettings} />
}

export default observer(MoreButtonContainer)
