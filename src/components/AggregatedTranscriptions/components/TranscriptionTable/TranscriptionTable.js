import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { arrayOf, shape, func } from 'prop-types'
import { observer } from 'mobx-react'
import TranscriptionTableRow from './TranscriptionTableRow'

const OverflowBox = styled(Box)`
  position: absolute;
`

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
  const emptyData = data.length === 0 || data[0].clusters_text.length === 0

  React.useEffect(() => moveData(data), [data])
  const background = emptyData ? { color: 'light-2', opacity: 'strong' } : {}

  return (
    <Box round={{ size: 'xsmall', corner: 'bottom' }}>
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
      {emptyData && (
        <OverflowBox background={background} fill pad='medium'>
          <Text size='xsmall'>This page does not contain transcription data.</Text>
        </OverflowBox>
      )}
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

export default observer(TranscriptionTable)
