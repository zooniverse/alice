import React from 'react'
import {
  Box,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from 'grommet'
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

const dragItems = [
  { id: '123', name: 'These are some transcribed lines' },
  { id: '456', name: 'And still there are more lines' },
  { id: '789', name: 'That we will reorganize' }
]

function renderRow(datum) {
  return (
    <TableRow>
      <TableCell scope='row'>{datum.id}</TableCell>
      <TableCell>{datum.name}</TableCell>
    </TableRow>
  )
}

function TranscriptionTable () {
  const [data, setData] = React.useState(dragItems)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            ID
          </TableCell>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((datum) => {
          return renderRow(datum)
        })}
      </TableBody>
    </Table>
  )
}


export default withThemeContext(TranscriptionTable, theme)
