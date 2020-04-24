import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import writeDate from 'helpers/writeDate'
import HeaderButton from './HeaderButton'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 0.25em;
`

const columns = [
  {
    property: "id",
    header: <HeaderButton property='id' title='ZOONIVERSE ID' />,
  },
  {
    property: "internal_id",
    header: <HeaderButton property='internal_id' title='INTERNAL ID' />
  },
  {
    property: "updated_at",
    header: (
      <HeaderButton property='updated_at' title='LAST EDIT' />
    ),
    render: datum => {
      const color = datum.locked_by ? 'red' : 'inherit'
      return <Text color={color}>{datum.locked_by ? 'LOCKED' : writeDate(datum.updated_at)}</Text>
    }
  },
  {
    property: "updated_by",
    header: (
      <HeaderButton property='updated_by' title='LAST EDITOR' />
    )
  },
  {
    property: "status",
    header: <HeaderButton property='status' title='STATUS' />,
    render: datum => <CapitalText>{datum.status}</CapitalText>
  },
  {
    property: "flagged",
    header: <HeaderButton property='flagged' title='FLAG' />,
    render: datum => datum.flagged ? <Box><StyledFontAwesomeIcon color='tomato' icon={faCircle} /></Box> : null
  },
  {
    property: "consensusScore",
    header: (
      <HeaderButton property='low_consensus_lines' title='CONSENSUS SCORE' />
    ),
    render: datum => {
      const color = datum.consensusScore <= datum.classifications / 2 ? 'red' : 'inherit'
      return <Text color={color}>{datum.low_consensus_lines}/{datum.transcribed_lines}</Text>
    }
  },
  {
    property: "transcribed_lines",
    header: (
      <HeaderButton property='total_lines' title='TRANSCRIBED LINES' />
    )
  },
  {
    property: "pages",
    header: (
      <HeaderButton property='total_pages' title='PAGES' />
    )
  },
];

export { columns }
