import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import { arrayOf, shape } from 'prop-types'
import TranscriptionTableRow from './TranscriptionTableRow'

const StyledText = styled('h6')`
  font-weight: normal;
  line-height: 1.25em;
  margin: 0;
`

const RightAlignText = styled(StyledText)`
  text-align: end;
`

function TranscriptionTable ({ data }) {
  const [dataArray, setData] = React.useState(data)
  const [dragID, setDragID] = React.useState(null)

  return (
    <Box>
      <Box direction='row' border='bottom' pad='xsmall'>
        <Box basis='4%' />
        <Box basis='80%'>
          <StyledText>Aggregated Transcription</StyledText>
        </Box>
        <Box basis='6%'>
          <StyledText>Flag</StyledText>
        </Box>
        <Box basis='10%'>
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
              setData={setData}
              setDragID={setDragID}
            />
          )
        })}
      </Box>
    </Box>
  )
}

TranscriptionTable.propTypes = {
  data: arrayOf(shape())
}

TranscriptionTable.defaultProps = {
  data: []
}

export default TranscriptionTable
