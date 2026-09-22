import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppContext from 'store'
import { undoManager } from 'store/AppStore'
import MODALS from 'helpers/modals'
import Resizer from './components/Resizer'
import AggregationModal from '../../components/AggregationSettings/AggregationModal'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'

const MIN_WIDTH = 33;

function findLocations(subject) {
  if (!subject || !subject.locations) return []

  return subject.locations.map(location => {
    const keys = Object.keys(location)
    return location[keys[0]]
  })
}

function Editor ({ match, testTime }) {
  const store = React.useContext(AppContext)
  const editorBox = React.useRef(null)

  React.useEffect(() => {
    let accessTime = new Date()

    const setResources = async () => {
      await store.getResources(match.params)
      await store.subjects.fetchSubject(match.params.subject)
      if (!store.transcriptions.lockedByCurrentUser) {
        store.modal.toggleModal(MODALS.LOCKED)
      }
    }
    setResources()
    store.transcriptions.setActiveTranscription()
    undoManager.clear()

    function handleTimeCheck() {
      let recheckTime = testTime || new Date(accessTime).setHours(accessTime.getHours() + 3)
      const shouldRecheck = new Date() > recheckTime
      if (shouldRecheck) {
        accessTime = new Date()
        recheckTime = new Date(accessTime).setHours(accessTime.getHours() + 3)
        store.transcriptions.checkIfLocked()
      }
    }

    window.addEventListener('beforeunload', store.transcriptions.unlockTranscription)
    window.addEventListener('visibilitychange', handleTimeCheck)

    return () => {
      store.image.reset()

      store.transcriptions.unlockTranscription()
      window.removeEventListener('beforeunload', store.transcriptions.unlockTranscription);
      window.removeEventListener('visibilitychange', handleTimeCheck)
    }
  }, [testTime, match, store])

  const disabled = store.aggregations.showModal || store.transcriptions.approved || store.transcriptions.isActive
  const subject = store.subjects.current
  const locations = findLocations(subject)
  const { layout } = store.editor

  const [viewerSize, setViewerSize] = React.useState(50)
  const [transcriberSize, setTranscriberSize] = React.useState(50)
  const [isMoving, setMove] = React.useState(false)
  const [currentPos, setPos] = React.useState()

  const onMouseDown = e => {
    if (disabled) return null;
    setMove(true);
    setNewPosition(e);
  }
  const setNewPosition = e => {
    const bounds = editorBox.current.getBoundingClientRect();
    if (layout === 'row') {
      setPos({ x: e.clientX - bounds.left })
    } else {
      setPos({ y: e.clientY - bounds.top })
    }
  }
  const resizePanels = (e) => {
    let newViewerSize
    if (layout === 'row') {
      newViewerSize = currentPos.x / editorBox.current.clientWidth * 100
    } else {
      newViewerSize = currentPos.y / editorBox.current.clientHeight * 100
    }
    const viewerSize = newViewerSize.toFixed(0)
    const transcriberSize = 100 - viewerSize
    if (viewerSize > MIN_WIDTH && transcriberSize > MIN_WIDTH) {
      setViewerSize(viewerSize)
      setTranscriberSize(transcriberSize)
    }
  }
  const onMouseMove = e => {
    if (isMoving) {
      resizePanels()
      setNewPosition(e)
      e.preventDefault()
    }
  }
  const viewerMargin = layout === 'row' ? { left: 'medium', right: 'xsmall' } : { horizontal: 'medium', bottom: 'xsmall' }
  const transcriptionsMargin = layout === 'row' ? { right: 'medium', left: 'xsmall' } : { horizontal: 'medium', top: 'xsmall' }

  return (
    <Box>
      <Box gap='small'>
        <Box
          direction={layout}
          height='large'
          onMouseLeave={() => { setMove(false) }}
          onMouseMove={onMouseMove}
          onMouseUp={() => { setMove(false) }}
          ref={editorBox}
        >
          <Box basis={`${viewerSize}%`} margin={viewerMargin}>
            <SubjectViewer />
          </Box>
          <Resizer
            direction={layout}
            disabled={disabled}
            onMouseDown={onMouseDown}
          />
          <Box basis={`${transcriberSize}%`}>
            <AggregatedTranscriptions margin={transcriptionsMargin} />
          </Box>
        </Box>
        <Box margin={{ horizontal: 'medium' }}>
          <FilmstripViewer images={locations} />
        </Box>
      </Box>
      {store.aggregations.showModal && <AggregationModal ref={editorBox} />}
    </Box>
  )
}

export { Editor, Resizer }
export default withRouter(observer(Editor))
