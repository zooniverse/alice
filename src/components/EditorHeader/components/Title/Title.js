import React from 'react'
import { observer } from 'mobx-react'
import { Box, Heading, Text } from 'grommet'
import AppContext from 'store'

function getHeader(titles) {
  return titles.find(title => title.length > 0)
}

function Title() {
  const store = React.useContext(AppContext)
  const project = store.projects.title
  const workflow = store.workflows.title
  const group = store.groups.title
  const subject = store.subjects.title
  const header = getHeader([subject, group, workflow, project])

  return (
    <Box>
      <Heading>{header}</Heading>
    </Box>
  )
}

export default observer(Title)
