import { useContext } from 'react';
import { observer } from 'mobx-react'
import AppContext from 'store'
import ErrorNotifier from './ErrorNotifier'

function ErrorNotifierContainer() {
  const store = useContext(AppContext)

  return (
    <ErrorNotifier
      error={store.transcriptions.error}
      showNotifier={store.transcriptions.showSaveTranscriptionError}
      toggleError={store.transcriptions.toggleError}
    />
  )
}

export default observer(ErrorNotifierContainer)
