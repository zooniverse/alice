import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'
import TranscriptionTableRow from './TranscriptionTableRow'
import withThemeContext from '../../../../helpers/withThemeContext'
import theme from './theme'

const CapitalText = styled('h6')`
  font-weight: normal;
  line-height: 1.25em;
  margin: 0;
  text-transform: uppercase;
`

function TranscriptionTable ({ data }) {
  const [dataArray, setData] = React.useState(data)
  const [dragID, setDragID] = React.useState(null)

  return (
    <Box>
      <Box direction='row' border='bottom' pad='xsmall'>
        <Box basis='80%'>
          <CapitalText>Aggregated Transcription</CapitalText>
        </Box>
        <Box basis='10%'>
          <CapitalText>Flag</CapitalText>
        </Box>
        <Box basis='10%'>
          <CapitalText>Consensus Line</CapitalText>
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


export default withThemeContext(TranscriptionTable, theme)
