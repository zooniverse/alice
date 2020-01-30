import React from 'react'
import AppContext from 'store'
import { observer } from 'mobx-react'
import SubjectViewerHeader from './SubjectViewerHeader'

function SubjectViewerHeaderContainer() {
  const store = React.useContext(AppContext)
  const toggleLineVisibility = () => store.editor.toggleLineVisibility()
  const linesVisible = store.editor.linesVisible

  return (
    <SubjectViewerHeader
      linesVisible={linesVisible}
      toggleLineVisibility={toggleLineVisibility}
    />
  )
}

export default observer(SubjectViewerHeaderContainer)
