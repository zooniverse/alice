import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripViewer from './FilmstripViewer'

function FilmstripViewerContainer({ images }) {
  const [isOpen, setOpen] = React.useState(true)
  const store = React.useContext(AppContext)

  return  (
    <FilmstripViewer
      images={images}
      isOpen={isOpen}
      setOpen={setOpen}
      subjectIndex={store.subject.index}
    />
  )
}

export default observer(FilmstripViewerContainer)
