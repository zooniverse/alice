import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.25em;
`

const columns = [
  {
    property: "id",
    header: "Zooniverse ID"
  },
  {
    property: "internal_id",
    header: "Internal ID"
  },
  {
    property: "lastEdit",
    header: "Last Edit",
    render: datum => {
      const color = datum.locked ? 'red' : 'black'
      return <Text color={color}>{datum.locked ? 'LOCKED' : datum.lastEdit}</Text>
    }
  },
  {
    property: "lastEditor",
    header: "Last Editor"
  },
  {
    property: "status",
    header: "Status",
    render: datum => <CapitalText>{datum.status}</CapitalText>
  },
  {
    property: "flagged",
    header: "Flag",
    render: datum => datum.flagged ? <Box><StyledFontAwesomeIcon color='tomato' icon={faCircle} /></Box> : null
  },
  {
    property: "consensusScore",
    header: "Consensus Score",
    render: datum => {
      const color = datum.consensusScore <= datum.classifications / 2 ? 'red' : 'black'
      return <Text color={color}>{datum.low_consensus_lines}/{datum.transcribed_lines}</Text>
    }
  },
  {
    property: "transcribed_lines",
    header: "Transcribed Lines"
  },
  {
    property: "pages",
    header: "Pages"
  },
];

export { columns }
