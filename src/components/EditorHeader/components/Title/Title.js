import React from 'react'
import { observer } from 'mobx-react'
import { Box, Heading } from 'grommet'
import AppContext from 'store'

function Title() {
  const store = React.useContext(AppContext)
  const project = store.projects.title

  return (
    <Box>
      <Heading>{project}</Heading>
    </Box>
  )
}

export default observer(Title)
