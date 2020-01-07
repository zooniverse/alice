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

function TranscriptionTable ({ data, toggleTranscription }) {
  const [dataArray, setData] = React.useState(data)
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
        {data.map((datum, i) => {
          return (
            <TranscriptionTableRow
              data={dataArray}
              datum={datum}
              dragID={dragID}
              index={i}
              key={`TRANSCRIPTION_ROW_${i}`}
              setData={setData}
              setDragID={setDragID}
              toggleTranscription={toggleTranscription}
            />
          )
        })}
      </Box>
    </Box>
  )
}

TranscriptionTable.propTypes = {
  data: arrayOf(shape()),
  toggleTranscription: func
}

TranscriptionTable.defaultProps = {
  data: [],
  toggleTranscription: () => {}
}

export default TranscriptionTable
