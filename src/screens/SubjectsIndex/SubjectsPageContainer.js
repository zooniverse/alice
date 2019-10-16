import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { EDIT_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { mockColumns, mockData } from './mock'

function SubjectsPageContainer (props) {
  const store = React.useContext(AppContext)
  const onSelection = (id) => {
    store.subject.fetchSubject(id, true)
    const nextPath = generatePath(EDIT_PATH, { subject: id, ...props.match.params})
    props.history.replace(nextPath)
  }

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable columns={mockColumns} data={mockData} onSelection={onSelection} />
    </Box>
  )
}

export default withRouter(SubjectsPageContainer)
