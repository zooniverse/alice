import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import MetadataButton from './MetadataButton'

function MetadataButtonContainer() {
  const store = React.useContext(AppContext)
  const metadata = store.subjects.current && store.subjects.current.metadata
  const id = store.subjects.current && store.subjects.current.id

  return <MetadataButton id={id} metadata={metadata} />
}

export default observer(MetadataButtonContainer)
