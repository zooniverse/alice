import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function SubjectSetPageContainer() {
  const store = React.useContext(AppContext)

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable columns={columns} data={store.groups.all} />
    </Box>
  )
}

export default observer(SubjectSetPageContainer)
