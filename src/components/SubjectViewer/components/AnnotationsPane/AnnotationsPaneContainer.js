import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import AnnotationsPane from './AnnotationsPane'

function AnnotationsPaneContainer() {
  const store = React.useContext(AppContext)
  console.log('This is the store', store);
  const transcriptions = []
  const offset = ``

  return (
    <AnnotationsPane
      offset={offset}
      transcriptions={transcriptions}
    />
  )
}

export default observer(AnnotationsPaneContainer)
