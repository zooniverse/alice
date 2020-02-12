import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripViewer from './FilmstripViewer'

function FilmstripViewerContainer({ images }) {
  const [isOpen, setOpen] = React.useState(true)
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showModal
  const selectImage = (id) => {
    store.image.reset()
    store.transcriptions.setActiveTranscription()
    store.transcriptions.changeIndex(id)
  }

  return  (
    <FilmstripViewer
      disabled={disabled}
      images={images}
      isOpen={isOpen}
      selectImage={selectImage}
      setOpen={setOpen}
      subjectIndex={store.transcriptions.index}
    />
  )
}

export default observer(FilmstripViewerContainer)
