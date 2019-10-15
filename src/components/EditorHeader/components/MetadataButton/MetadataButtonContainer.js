import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import MetadataButton from './MetadataButton'

function MetadataButtonContainer() {
  const store = React.useContext(AppContext)
  const metadata = store.subject.current && store.subject.current.metadata

  return <MetadataButton metadata={metadata} />
}

export default observer(MetadataButtonContainer)
