import React from 'react'
import { Box, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import styled, { css } from 'styled-components'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { observer } from 'mobx-react'
import { Flags } from './Flags'

const QuietBox = styled(Box)`
  pointer-events: none;
  ${css`pointer-events: ${props => props.hover ? 'all' : 'none'};`}
`

const MoveBox = styled(Box)`
  ${css`cursor: ${props => (props.hover && !props.isViewer) ? 'move' : 'default'};`}
  ${css`pointer-events: ${props => props.hover ? 'all' : 'none'};`}
`

const PointerBox = styled(Box)`
  ${css`cursor: ${props => props.hover ? 'pointer' : 'default'};`}
`

const StyledText = styled(Text)`
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
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
  isViewer,
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
  const visibleText = datum.edited_consensus_text || datum.consensus_text

  return (
    <Box
      border={{ color: '#ECECEC', side: 'bottom' }}
      elevation={elevation}
      gap='xsmall'
      height={{ min: '1.5rem' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      margin={{ right: '0.15em' }}
      pad='0.2em'
      round={round}
    >
      <PointerBox
        align='center'
        direction='row'
        draggable={!isViewer}
        hover={isHover}
        onDragEnd={() => {
          setTextObject(data);
          setDragID(null)
        }}
        onDragEnter={(e) => handleDragEnter(e, index, data, dragID, moveData, setDragID)}
        onDragOver={(e) => stopEvents(e)}
        onDragStart={() => handleDragStart(index, setDragID, setHover)}
        onMouseUp={() => setActiveTranscription(index)}
      >
        <MoveBox
          hover={isHover}
          isViewer={isViewer}
          onMouseUp={(e) => stopEvents(e)}
          pad='0.2em'
          basis='5%'
        >
          {!isViewer && (
            <QuietBox align='center'>
              <Menu color={hamburgerColor} size='0.75em' />
            </QuietBox>
          )}
        </MoveBox>
        <QuietBox hover={isHover} basis='72%'>
          <StyledText title={visibleText}>{visibleText}</StyledText>
        </QuietBox>
        <QuietBox basis='10%'>
          <Flags datum={datum} />
        </QuietBox>
        <QuietBox align='end' basis='13%' pad={{ right: '0.25em' }}>
          {datum.edited_consensus_text ? (
            <Text>Edited</Text>
          ) : (
            <Text>{parseFloat(datum.consensus_score.toFixed(1))}/{datum.number_views}</Text>
          )}
        </QuietBox>
      </PointerBox>
    </Box>
  )
}

TranscriptionTableRow.propTypes = {
  datum: shape({
    consensus_score: number,
    consensus_text: string,
    edited_consensus_text: string,
    number_views: number
  }),
  data: arrayOf(shape()),
  dragID: number,
  index: number,
  isViewer: bool,
  moveData: func,
  setDragID: func,
  setActiveTranscription: func
}

TranscriptionTableRow.defaultProps = {
  datum: {
    consensus_score: 0,
    consensus_text: '',
    edited_consensus_text: '',
    number_views: 0
  },
  data: [],
  dragID: null,
  index: null,
  isViewer: false,
  moveData: () => {},
  setDragID: () => {},
  setActiveTranscription: () => {}
}

export { PointerBox, MoveBox }
export default observer(TranscriptionTableRow)
