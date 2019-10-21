import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { Rnd } from 'react-rnd';
import styled from 'styled-components'
import Resizer from './components/Resizer'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'
import AggregationSettings from '../../components/AggregationSettings'

const MIN_WIDTH = 33;

const StyledRnd = styled(Rnd)`
  z-index: 100;
`



function Editor() {
  const editorBox = React.useRef(null)
  const store = React.useContext(AppContext)
  const direction = store.editor.layout
  const showSettings = store.aggregations.showSettings

  const [viewerSize, setViewerSize] = React.useState(50)
  const [transcriberSize, setTranscriberSize] = React.useState(50)
  const [isMoving, setMove] = React.useState(false)
  const [currentPos, setPos] = React.useState()

  const onMouseDown = e => {
    setMove(true)
    setNewPosition(e);
  }
  const setNewPosition = e => {
    const bounds = editorBox.current.getBoundingClientRect();
    if (direction === 'row') {
      setPos({ x: e.clientX - bounds.left })
    } else {
      setPos({ y: e.clientY - bounds.top })
    }
  }
  const resizePanels = (e) => {
    let newViewerSize
    if (direction === 'row') {
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

  const defaultPosition = { x: window.innerWidth / 2, y: 0 }

  return (
    <Box>
      {showSettings && (
        <StyledRnd
          default={defaultPosition}
          dragHandleClassName='handle'
          enableResizing={false}
        >
          <AggregationSettings />
        </StyledRnd>
      )}

      <Box gap='small' margin={{ horizontal: 'medium'}}>
        <Box
          direction={direction}
          height='large'
          onMouseLeave={() => { setMove(false) }}
          onMouseMove={onMouseMove}
          onMouseUp={() => { setMove(false) }}
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
        <FilmstripViewer />
      </Box>
    </Box>
  )
}

export default observer(Editor)
