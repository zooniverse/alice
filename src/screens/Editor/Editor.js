import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import Resizer from './components/Resizer'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'

function Editor() {
  const editorBox = React.useRef(null)
  const store = React.useContext(AppContext)
  const direction = store.classifier.layout

  const [viewerSize, setViewerSize] = React.useState(50)
  const [transcriberSize, setTranscriberSize] = React.useState(50)
  const [isMoving, setMove] = React.useState(false)
  const [currentPos, setPos] = React.useState()

  const onMouseDown = e => {
    setMove(true)
    setPos({ x: e.clientX })
  }
  const resizePanels = (e) => {
    const newViewerWidth = currentPos.x / editorBox.current.clientWidth * 100
    const viewerWidth = newViewerWidth.toFixed(1)
    const transcriberWidth = 100 - viewerWidth
    setViewerSize(viewerWidth)
    setTranscriberSize(transcriberWidth)
  }
  const onMouseUp = e => setMove(false)
  const onMouseMove = e => {
    if (isMoving) {
      resizePanels()
      setPos({ x: e.clientX })
    }
  }

  return (
    <Box>
      <Box
        direction={direction}
        pad={{ horizontal: 'medium' }}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={editorBox}
      >
        <Box basis={`${viewerSize}%`}>
          <SubjectViewer />
        </Box>
        <Resizer
          direction={direction}
          onMouseDown={onMouseDown}
        />
        <Box basis={`${transcriberSize}%`}>
          <AggregatedTranscriptions />
        </Box>
      </Box>
      <Box margin={{ horizontal: 'medium', top: 'small' }}>
        <FilmstripViewer />
      </Box>
    </Box>
  )
}

export default observer(Editor)
