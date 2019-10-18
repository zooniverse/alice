import React from 'react'
import { TableCell, TableRow } from 'grommet'

function handleDragStart(e, dragID, setDragID) {
   setDragID(dragID)
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
  return (
    <TableRow
      draggable='true'
      onDragEnter={(e) => dragEnter(e, index, data, dragID, setData, setDragID)}
      onDragStart={(e) => handleDragStart(e, index, setDragID)}
      onDragOver={allowDrop}
    >
      <TableCell scope='row'>{datum.id}</TableCell>
      <TableCell>{datum.name}</TableCell>
    </TableRow>
  )
}
