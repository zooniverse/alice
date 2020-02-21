import React from 'react'
import AppContext from 'store'
import ASYNC_STATES from 'helpers/asyncStates'
import { observer } from 'mobx-react'
import SaveStatus from './SaveStatus'

function SaveStatusContainer() {
  const store = React.useContext(AppContext)
  const text = store.transcriptions.asyncState === ASYNC_STATES.ERROR ?
    'CHANGES NOT SAVED' : 'ALL CHANGES SAVED'

  return (
    <SaveStatus text={text} />
  )
}

export default observer(SaveStatusContainer)
