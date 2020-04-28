import React from 'react'
import { observer } from 'mobx-react'
import AppContext from 'store'
import FilmstripViewer from './FilmstripViewer'

function FilmstripViewerContainer({ images }) {
  const [isOpen, setOpen] = React.useState(true)
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showModal || store.transcriptions.isActive
  const selectImage = (page, slopeIndex) => {
    store.image.reset()
    store.transcriptions.setActiveTranscription()
    store.transcriptions.changeIndex(page, slopeIndex)
  }

  return  (
    <FilmstripViewer
      activeSlope={store.transcriptions.slopeIndex}
      disabled={disabled}
      images={images}
      isOpen={isOpen}
      rearrangePages={store.transcriptions.rearrangePages}
      selectImage={selectImage}
      setSlopeKeys={store.transcriptions.setSlopeKeys}
      setOpen={setOpen}
      slopeDefinitions={store.transcriptions.slopeDefinitions}
      slopeKeys={store.transcriptions.slopeKeys}
      subjectIndex={store.transcriptions.index}
    />
  )
}

export default observer(FilmstripViewerContainer)
