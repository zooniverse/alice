import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { GROUPS_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import COLUMNS from './workflowColumns'

function WorkflowsPageContainer({ history, match }) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.projects.selectProject(match.params.project)
    store.workflows.fetchWorkflows(match.params.project)
    store.groups.selectGroup(null)
    store.workflows.selectWorkflow(null)
  }, [match, store])

  const onSelection = workflow => {
    const nextPath = generatePath(GROUPS_PATH, { workflow: workflow.id, ...match.params})
    history.push(nextPath)
  }
  const workflows = Array.from(store.workflows.all.values())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={COLUMNS}
        data={workflows}
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
