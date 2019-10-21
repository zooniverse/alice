import React from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import TranscriptionTableRow from './TranscriptionTableRow'
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

function TranscriptionTable () {
  const [data, setData] = React.useState(dragItems)
  const [dragID, setDragID] = React.useState(null)

  return (
    <Box>
      <Box direction='row' border='bottom' pad='xsmall'>
        <Box basis='20%'>
          <Text>ID</Text>
        </Box>
        <Box basis='80%'>
          <Text>Name</Text>
        </Box>
      </Box>
      <Box pad={{ bottom: 'xsmall' }}>
        {data.map((datum, i) => {
          return (
            <TranscriptionTableRow
              data={data}
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
