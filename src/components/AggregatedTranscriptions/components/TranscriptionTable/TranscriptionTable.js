import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { arrayOf, bool, shape, func } from 'prop-types'
import { observer } from 'mobx-react'
import TranscriptionTableRow from './TranscriptionTableRow'

const OverflowBox = styled(Box)`
  position: absolute;
`

const StyledText = styled('h6')`
  font-weight: normal;
  line-height: 1.25em;
  margin: 0;
  text-transform: uppercase;
`

const RightAlignText = styled(StyledText)`
  text-align: end;
`

function TranscriptionTable ({ activeSlope, data, isViewer, setActiveTranscription, setTextObject }) {
  const [dataArray, resetDataArray] = React.useState(data)
  const [dragID, setDragID] = React.useState(null)
  const emptyData = data.length === 0

  React.useEffect(() => {
    if (dragID === null) resetDataArray(data)
  }, [data, dragID])
  const background = emptyData ? { color: 'light-2', opacity: 'strong' } : {}

  return (
    <Box round={{ size: 'xsmall', corner: 'bottom' }}>
      <Box align='center' direction='row' margin={{ horizontal: 'xsmall' }} pad={{ vertical: 'xsmall' }}>
        <Box basis='80%' margin={{ left: 'xsmall' }}>
          <StyledText>Aggregated Transcription</StyledText>
        </Box>
        <Box>
          <StyledText>Flag</StyledText>
        </Box>
        <Box margin={{ left: 'auto' }}>
          <RightAlignText>Consensus Score</RightAlignText>
        </Box>
      </Box>
      <Box pad={{ bottom: 'xsmall' }}>
        {dataArray.map((datum, i) => {
          if (activeSlope !== datum.line_slope) return null
          return (
            <TranscriptionTableRow
              data={dataArray}
              datum={datum}
              dragID={dragID}
              index={i}
              isViewer={isViewer}
              key={`TRANSCRIPTION_ROW_${i}`}
              moveData={resetDataArray}
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
  isViewer: bool,
  setActiveTranscription: func
}

TranscriptionTable.defaultProps = {
  data: [],
  isViewer: false,
  setActiveTranscription: () => {}
}

export default observer(TranscriptionTable)
