import { useContext } from 'react';
import AppContext from 'store'
import { observer } from 'mobx-react'
import SubjectViewerHeader from './SubjectViewerHeader'

function SubjectViewerHeaderContainer() {
  const store = useContext(AppContext)
  const toggleLineVisibility = () => store.editor.toggleLineVisibility()

  return (
    <SubjectViewerHeader
      disabled={store.transcriptions.isActive}
      linesVisible={store.editor.linesVisible}
      toggleLineVisibility={toggleLineVisibility}
    />
  )
}

export default observer(SubjectViewerHeaderContainer)
