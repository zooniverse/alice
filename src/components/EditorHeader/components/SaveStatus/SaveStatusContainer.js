import { useContext } from 'react';
import AppContext from 'store'
import { observer } from 'mobx-react'
import SaveStatus from './SaveStatus'

function SaveStatusContainer() {
  const store = useContext(AppContext)

  return (
    <SaveStatus
      status={store.transcriptions.asyncState}
      toggleError={store.transcriptions.toggleError}
    />
  )
}

export default observer(SaveStatusContainer)
