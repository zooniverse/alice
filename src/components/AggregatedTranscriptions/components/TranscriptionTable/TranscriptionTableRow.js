import React from 'react'
import { Box, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import styled from 'styled-components'
import { arrayOf, func, number, shape } from 'prop-types'
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

function handleDragEnter(e, dropID, data, dragID, setData, setDragID) {
  e.preventDefault()
  let copiedArray = data.slice()
  const itemToMove = copiedArray.splice(dragID, 1)[0]
  copiedArray.splice(dropID,0,itemToMove)
  setDragID(dropID)
  setData(copiedArray)
}

function TranscriptionTableRow({ datum, index, data, setData, setDragID, dragID, toggleTranscription }) {
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
      onDragEnd={() => setDragID(null)}
      onDragEnter={(e) => handleDragEnter(e, index, data, dragID, setData, setDragID)}
      onDragOver={stopEvents}
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
        onMouseUp={() => toggleTranscription()}>
        <MoveBox
          onMouseUp={(e) => stopEvents(e)}
          hover={isHover}
          pad='0.25em'
          basis='5%'
        >
          <QuietBox>
            <Menu color={hamburgerColor} size='small' />
          </QuietBox>
        </MoveBox>
        <QuietBox basis='75%'>
          <Text>{datum.transcription}</Text>
        </QuietBox>
        <QuietBox basis='10%'>
          <Flags datum={datum} />
        </QuietBox>
        <QuietBox align='end' basis='10%'>
          <Text>{datum.consensus}/{datum.counts}</Text>
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
  setData: func,
  setDragID: func,
  toggleTranscription: func
}

TranscriptionTableRow.defaultProps = {
  datum: {},
  data: [],
  dragID: null,
  index: null,
  setData: () => {},
  setDragID: () => {},
  toggleTranscription: () => {}
}

export { PointerBox, MoveBox }
export default TranscriptionTableRow
