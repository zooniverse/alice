import React from 'react'
import { Box, DataTable, Text } from 'grommet'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'

const EllipsedText = styled(Text)`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
`

function RenderFlags(datum) {
  return (
    <Box align='center' direction='row'>
      {datum.reviewed && <StyledFontAwesomeIcon color='green' icon={faCircle} />}
      {datum.flagged && <StyledFontAwesomeIcon color='tomato' icon={faCircle} />}
    </Box>
  )
}

const columns = [
  {
    property: "transcription",
    header: "Aggregated Transcription",
    render: datum => <Box width='medium'><EllipsedText>{datum.transcription}</EllipsedText></Box>
  },
  {
    property: "flag",
    header: "Flag",
    align: 'center',
    render: datum => RenderFlags(datum)
  },
  {
    property: "goldStandard",
    render: datum => (
      <Box>
        {datum.goldStandard && <FontAwesomeIcon color='gold' icon={faStar} size='xs' />}
      </Box>
    )
  },
  {
    property: "score",
    header: "Consensus Score",
    align: 'center',
    render: datum => <Text>{datum.consensus}/{datum.counts}</Text>
  }
];

function TranscriptionTable ({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  )
}


export default TranscriptionTable
