import React from 'react'
import { observer } from 'mobx-react'
import { Box, Heading, Text } from 'grommet'
import AppContext from 'store'
import styled from 'styled-components'
import { bool } from 'prop-types'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

function Title({ onEditor }) {
  const store = React.useContext(AppContext)
  const project = store.projects.title
  const workflow = store.workflows.title
  const group = store.groups.title
  const subject = store.subjects.title
  let titles = [subject, group, workflow, project]

  const headerIndex = titles.findIndex(title => title.length > 0)
  let header = titles[headerIndex]
  titles.splice(headerIndex, 1)

  if (onEditor) {
    titles = [group]
    header = subject
  }
  const subjectCount = header === group ?
    `(${store.transcriptions.approvedCount}/${store.transcriptions.all.length} approved)` : ''

  return (
    <Box align='baseline' direction='row' gap='0.25em'>
      {titles.reverse().map((sub, i) =>
        sub.length > 0 && <CapitalText key={`SUB_HEADER_${i}`}>{`${sub} /`}</CapitalText>)}
      <Heading>{header}</Heading>
      <CapitalText>{subjectCount}</CapitalText>
    </Box>
  )
}

Title.propTypes = {
  onEditor: bool
}

Title.defaultProps = {
  onEditer: false
}

export default observer(Title)
