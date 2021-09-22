import { useContext } from 'react';
import { observer } from 'mobx-react'
import AppContext from 'store'
import MODALS from 'helpers/modals'
import STATUS from 'helpers/status'
import FilmstripViewer from './FilmstripViewer'

function FilmstripViewerContainer({ images }) {
  const store = useContext(AppContext)
  const disabled = store.aggregations.showModal || store.transcriptions.isActive
  const showDeletePage = (e) => store.modal.toggleModal(MODALS.DELETE_PAGE)
  const selectImage = (page, slopeIndex) => {
    store.image.reset()
    store.transcriptions.setActiveTranscription()
    store.transcriptions.changeIndex(page, slopeIndex)
  }
  const inProgress = store.transcriptions.current && store.transcriptions.current.status !== STATUS.APPROVED

  return  (
    <FilmstripViewer
      activeSlope={store.transcriptions.slopeIndex}
      disabled={disabled}
      draggable={inProgress}
      images={images}
      rearrangePages={store.transcriptions.rearrangePages}
      selectImage={selectImage}
      showDeletePage={showDeletePage}
      slopeDefinitions={store.transcriptions.slopeDefinitions}
      slopeKeys={store.transcriptions.slopeKeys}
      subjectIndex={store.transcriptions.index}
    />
  )
}

export default observer(FilmstripViewerContainer)
