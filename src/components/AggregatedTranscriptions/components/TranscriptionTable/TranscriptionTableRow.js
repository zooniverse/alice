import React from 'react'
import { Box } from 'grommet'
import { Menu } from 'grommet-icons'

function handleDragStart(e, dragID, setDragID, setHover) {
  e.dataTransfer.setDragImage(new Image(), 0, 0)
  setDragID(dragID)
  setHover(false)
}

function allowDrop(e) {
  e.preventDefault()
}

function dragEnter(e, dropID, data, dragID, setData, setDragID) {
  e.preventDefault()
  let copiedArray = data.slice()
  const itemToMove = copiedArray.splice(dragID, 1)[0]
  copiedArray.splice(dropID,0,itemToMove)
  setDragID(dropID)
  setData(copiedArray)
}

export default function TranscriptionTableRow({ datum, index, data, setData, setDragID, dragID }) {
  const [isHover, setHover] = React.useState(false)
  const isDragging = dragID === index
  const hamburgerColor = isHover || isDragging ? 'black' : 'transparent'
  const elevation = isHover || isDragging ? 'small' : 'none'
  const round = isHover || isDragging ? 'xsmall' : 'none'

  return (
    <Box
      align='center'
      border='bottom'
      direction='row'
      draggable='true'
      elevation={elevation}
      gap='xsmall'
      onDragEnd={() => { setDragID(null) }}
      onDragEnter={(e) => dragEnter(e, index, data, dragID, setData, setDragID)}
      onDragOver={allowDrop}
      onDragStart={(e) => handleDragStart(e, index, setDragID, setHover)}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      round={round}
    >
      <Box pad='xsmall' width='0.1em'>
        <Menu color={hamburgerColor} size='small' />
      </Box>
      <Box>{datum.id}</Box>
      <Box>{datum.name}</Box>
    </Box>
  )
}
