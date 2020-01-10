import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { arrayOf, shape, func } from 'prop-types'
import TranscriptionTableRow from './TranscriptionTableRow'

const StyledText = styled('h6')`
  font-weight: normal;
  line-height: 1.25em;
  margin: 0;
`

const RightAlignText = styled(StyledText)`
  margin-left: auto;
  text-align: end;
`

function TranscriptionTable ({ data, setActiveTranscription, setTextObject }) {
  const [dataArray, moveData] = React.useState(data)
  const [dragID, setDragID] = React.useState(null)

  return (
    <Box>
      <Box direction='row' margin={{ horizontal: 'xsmall' }} pad={{ vertical: 'xsmall' }}>
        <Box basis='80%' margin={{ left: 'small' }}>
          <StyledText>Aggregated Transcription</StyledText>
        </Box>
        <Box>
          <StyledText>Flag</StyledText>
        </Box>
        <Box>
          <RightAlignText>Consensus Line</RightAlignText>
        </Box>
      </Box>
      <Box pad={{ bottom: 'xsmall' }}>
        {dataArray.map((datum, i) => {
          return (
            <TranscriptionTableRow
              data={dataArray}
              datum={datum}
              dragID={dragID}
              index={i}
              key={`TRANSCRIPTION_ROW_${i}`}
              moveData={moveData}
              setActiveTranscription={setActiveTranscription}
              setDragID={setDragID}
              setTextObject={setTextObject}
            />
          )
        })}
      </Box>
    </Box>
  )
}

TranscriptionTable.propTypes = {
  data: arrayOf(shape()),
  setActiveTranscription: func
}

TranscriptionTable.defaultProps = {
  data: [],
  setActiveTranscription: () => {}
}

export default TranscriptionTable
