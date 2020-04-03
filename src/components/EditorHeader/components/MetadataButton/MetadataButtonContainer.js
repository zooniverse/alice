import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import MetadataButton from './MetadataButton'

function MetadataButtonContainer() {
  const store = React.useContext(AppContext)
  const metadata = store.subjects.current && store.subjects.current.metadata
  const id = store.subjects.current && store.subjects.current.id
  const status = store.transcriptions.current && store.transcriptions.current.status
  const disabled = store.aggregations.showModal || store.transcriptions.isActive

  return (
    <MetadataButton
      disabled={disabled}
      id={id}
      metadata={metadata}
      status={status}
    />
  )
}

export default observer(MetadataButtonContainer)
