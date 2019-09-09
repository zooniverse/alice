import React from 'react'
import { Box, DataTable, Text } from 'grommet'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import withThemeContext from '../../../../helpers/withThemeContext'
import theme from './theme'

const EllipsedText = styled(Text)`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.5em;
`

function RenderFlags(datum) {
  return (
    <Box direction='row'>
      <Box align='center' direction='row' justify='center' width='3em'>
        {datum.reviewed && <StyledFontAwesomeIcon color='green' icon={faCircle} />}
        {datum.flagged && <StyledFontAwesomeIcon color='tomato' icon={faCircle} />}
      </Box>
      <Box width='1em'>
        {datum.goldStandard && <FontAwesomeIcon color='gold' icon={faStar} size='xs' />}
      </Box>
    </Box>
  )
}

const columns = [
  {
    property: 'transcription',
    header: <CapitalText>Aggregated Transcription</CapitalText>,
    render: datum => <Box width='27em'><EllipsedText>{datum.transcription}</EllipsedText></Box>
  },
  {
    property: 'flag',
    header: <CapitalText textAlign='center'>Flag</CapitalText>,
    align: 'center',
    render: datum => RenderFlags(datum)
  },
  {
    property: 'score',
    header: <CapitalText textAlign='center'>Consensus Score</CapitalText>,
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


export default withThemeContext(TranscriptionTable, theme)
