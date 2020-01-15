import React from 'react'
import { Box, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import styled from 'styled-components'
import { arrayOf, func, number, shape } from 'prop-types'
import { observer } from 'mobx-react'
import { Flags } from './Flags'

const QuietBox = styled(Box)`
  pointer-events: none;
`

const MoveBox = styled(Box)`
  cursor: ${props => props.hover ? 'move' : 'default'};
  pointer-events: ${props => props.hover ? 'all' : 'none'};
`

const PointerBox = styled(Box)`
  cursor: ${props => props.hover ? 'pointer' : 'default'};
  pointer-events: ${props => props.hover ? 'all' : 'none'};
`

function handleDragStart(dragID, setDragID, setHover) {
  setDragID(dragID)
  setHover(false)
}

function stopEvents(e) {
  e.preventDefault()
  e.stopPropagation()
}

function handleDragEnter(e, dropID, data, dragID, moveData, setDragID) {
  e.preventDefault()
  let copiedArray = data.slice()
  const itemToMove = copiedArray.splice(dragID, 1)[0]
  copiedArray.splice(dropID,0,itemToMove)
  setDragID(dropID)
  moveData(copiedArray)
}

function TranscriptionTableRow({
  data,
  datum,
  dragID,
  index,
  moveData,
  setActiveTranscription,
  setDragID,
  setTextObject
}) {
  const [isHover, setHover] = React.useState(false)
  const isDragging = dragID === index
  const hamburgerColor = isHover || isDragging ? 'black' : 'transparent'
  const elevation = isHover || isDragging ? 'small' : 'none'
  const round = isHover || isDragging ? 'xsmall' : 'none'

  return (
    <Box
      border={{ color: '#ECECEC', side: 'bottom' }}
      draggable='true'
      elevation={elevation}
      flex={false}
      gap='xsmall'
      onDragEnd={() => {
        setTextObject(data);
        setDragID(null)
      }}
      onDragEnter={(e) => handleDragEnter(e, index, data, dragID, moveData, setDragID)}
      onDragOver={(e) => stopEvents(e)}
      onDragStart={() => handleDragStart(index, setDragID, setHover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      margin={{ right: '0.15em' }}
      pad='0.2em'
      round={round}
    >
      <PointerBox
        align='center'
        direction='row'
        hover={isHover}
        onMouseUp={() => setActiveTranscription(index)}>
        <MoveBox
          onMouseUp={(e) => stopEvents(e)}
          hover={isHover}
          pad='0.2em'
          basis='4%'
        >
          <QuietBox>
            <Menu color={hamburgerColor} size='xsmall' />
          </QuietBox>
        </MoveBox>
        <QuietBox basis='76%'>
          <Text>{datum.edited_consensus_text || datum.consensus_text}</Text>
        </QuietBox>
        <QuietBox basis='10%'>
          <Flags datum={datum} />
        </QuietBox>
        <QuietBox align='end' basis='10%' pad={{ right: '0.25em' }}>
          <Text>{parseFloat(datum.consensus_score.toFixed(1))}/{datum.number_views}</Text>
        </QuietBox>
      </PointerBox>
    </Box>
  )
}

TranscriptionTableRow.propTypes = {
  datum: shape(),
  data: arrayOf(shape()),
  dragID: number,
  index: number,
  moveData: func,
  setDragID: func,
  setActiveTranscription: func
}

TranscriptionTableRow.defaultProps = {
  datum: {},
  data: [],
  dragID: null,
  index: null,
  moveData: () => {},
  setDragID: () => {},
  setActiveTranscription: () => {}
}

export { PointerBox, MoveBox }
export default observer(TranscriptionTableRow)
