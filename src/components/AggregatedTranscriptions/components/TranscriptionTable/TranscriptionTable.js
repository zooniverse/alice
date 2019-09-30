import React from 'react'
import { Box, DataTable, Text } from 'grommet'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import withThemeContext from '../../../../helpers/withThemeContext'
import theme from './theme'

const CapitalText = styled('h6')`
  font-weight: normal;
  line-height: 1.25em;
  margin: 0;
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
    header: <Box justify='center' height='inherit'><CapitalText size='xsmall'>Aggregated Transcription</CapitalText></Box>,
    render: datum => <Box><Text>{datum.transcription}</Text></Box>
  },
  {
    property: 'flag',
    header: <Box justify='center' height='inherit'><CapitalText textAlign='center' size='xsmall'>Flag</CapitalText></Box>,
    align: 'center',
    render: datum => RenderFlags(datum)
  },
  {
    property: 'score',
    header: <CapitalText textAlign='center' size='xsmall'>Consensus Score</CapitalText>,
    align: 'center',
    render: datum => <Text>{datum.consensus}/{datum.counts}</Text>
  }
];

function TranscriptionTable ({ data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pad={{ header: { left: 'small', top: 'xsmall' }, body: { vertical: '0.25em', left: 'small' } }}
    />
  )
}


export default withThemeContext(TranscriptionTable, theme)
