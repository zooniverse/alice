import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import ASYNC_STATES from 'helpers/asyncStates'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import ResourcesTable from '../../components/ResourcesTable'
import COLUMNS from './workflowColumns'

function WorkflowPageContainer() {
  const store = React.useContext(AppContext)
  const { project } = useParams();
  if (store.workflows.asyncState === ASYNC_STATES.IDLE) {
    store.workflows.fetchWorkflows(project)
  }

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={COLUMNS}
        data={store.workflows.all}
        error={store.workflow.error}
        status={store.workflows.asyncState}
      />
    </Box>
  )
}

export default observer(WorkflowPageContainer)
