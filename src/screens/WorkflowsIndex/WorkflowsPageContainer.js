import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import ASYNC_STATES from 'helpers/asyncStates'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { SUBJECT_SETS_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import COLUMNS from './workflowColumns'

function WorkflowsPageContainer({ history, match }) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.groups.selectGroup(null)
    store.workflows.selectWorkflow(null)
  }, [store])

  if (store.workflows.asyncState === ASYNC_STATES.IDLE) {
    const projectId = match.params && match.params.project
    store.workflows.fetchWorkflows(projectId)
  }
  const onSelection = workflow => {
    store.workflows.selectWorkflow(workflow)
    const nextPath = generatePath(SUBJECT_SETS_PATH, { workflow: workflow.id, ...match.params})
    history.push(nextPath)
  }

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={COLUMNS}
        data={store.workflows.all}
        error={store.workflows.error}
        onSelection={onSelection}
        resource='Workflows'
        status={store.workflows.asyncState}
      />
    </Box>
  )
}

export { WorkflowsPageContainer }
export default withRouter(observer(WorkflowsPageContainer))
