import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import ResourcesTable from '../../components/ResourcesTable'
import { mockColumns, mockData } from './mock'

export default function SubjectsPageContainer () {
  const store = React.useContext(AppContext)
  const onSelection = (id) => store.subject.fetchSubject(id, true)

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable columns={mockColumns} data={mockData} onSelection={onSelection} />
    </Box>
  )
}
