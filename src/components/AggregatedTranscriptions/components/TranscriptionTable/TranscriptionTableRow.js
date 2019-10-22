import React from 'react'
import { Box, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import { Flags } from './Flags'
import styled from 'styled-components'

const QuietBox = styled(Box)`
  pointer-events: none;
`

function handleDragStart(dragID, setDragID, setHover) {
  setDragID(dragID)
  setHover(false)
}

function allowDrop(e) {
  e.preventDefault()
}

function handleDragEnter(e, dropID, data, dragID, setData, setDragID) {
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
      flex={false}
      gap='xsmall'
      onDragEnd={() => { setDragID(null) }}
      onDragEnter={(e) => handleDragEnter(e, index, data, dragID, setData, setDragID)}
      onDragOver={allowDrop}
      onDragStart={() => handleDragStart(index, setDragID, setHover)}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      margin={{ right: '0.1em' }}
      pad='0.2em'
      round={round}
    >
      <QuietBox pad='0.5em' width='0.1em'>
        <Menu color={hamburgerColor} size='small' />
      </QuietBox>
      <QuietBox basis='80%' wrap>
        <Text>{datum.transcription}</Text>
      </QuietBox>
      <QuietBox basis='5%'>
        <Flags datum={datum} />
      </QuietBox>
      <QuietBox align='end' basis='10%'>
        <Text>{datum.consensus}/{datum.counts}</Text>
      </QuietBox>
    </Box>
  )
}
