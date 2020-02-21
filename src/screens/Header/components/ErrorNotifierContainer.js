import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import ErrorNotifier from './ErrorNotifier'

function ErrorNotifierContainer() {
  const store = React.useContext(AppContext)

  return (
    <ErrorNotifier
      showNotifier={store.transcriptions.showSaveTranscriptionError}
      toggleError={store.transcriptions.toggleError}
    />
  )
}

export default observer(ErrorNotifierContainer)
