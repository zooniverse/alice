import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripViewer from './FilmstripViewer'

function FilmstripViewerContainer({ images }) {
  const [isOpen, setOpen] = React.useState(true)
  const store = React.useContext(AppContext)
  const selectImage = (id) => { store.subject.changeIndex(id) }

  return  (
    <FilmstripViewer
      images={images}
      isOpen={isOpen}
      selectImage={selectImage}
      setOpen={setOpen}
      subjectIndex={store.subject.index}
    />
  )
}

export default observer(FilmstripViewerContainer)
