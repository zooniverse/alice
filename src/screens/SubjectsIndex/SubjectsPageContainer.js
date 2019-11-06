import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { EDIT_PATH } from 'paths'
import MODALS from 'helpers/modals'
import ResourcesTable from '../../components/ResourcesTable'
import { mockColumns, mockData } from './mock'

function SubjectsPageContainer (props) {
  const store = React.useContext(AppContext)
  const onSelection = (datum) => {
    if (datum.locked) {
      store.modal.toggleModal(MODALS.LOCKED)
    }
    const nextPath = generatePath(EDIT_PATH, { subject: datum.id, ...props.match.params})
    props.history.push(nextPath)
  }

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable columns={mockColumns} data={mockData} onSelection={onSelection} />
    </Box>
  )
}

export { SubjectsPageContainer }
export default withRouter(SubjectsPageContainer)
