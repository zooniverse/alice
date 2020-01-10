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
    const setResources = async () => {
      await store.getResources(match.params)
      await store.workflows.fetchWorkflows(match.params.project)
    }
    setResources()
  }, [match, store])

  const onSelection = workflow => {
    const nextPath = generatePath(GROUPS_PATH, { workflow: workflow.id, ...match.params})
    history.push(nextPath)
  }
  const workflows = Array.from(store.workflows.all.values())

  const onSetPage = (page) => {
    const projectId = match.params && match.params.project
    store.workflows.fetchWorkflows(projectId, page)
  }
  const steps = Array.from(Array(store.workflows.totalPages).keys())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        activeStep={store.workflows.page}
        columns={COLUMNS}
        data={workflows}
        error={store.workflows.error}
        onSelection={onSelection}
        resource='Workflows'
        setStep={onSetPage}
        status={store.workflows.asyncState}
        steps={steps}
      />
    </Box>
  )
}

export { WorkflowsPageContainer }
export default withRouter(observer(WorkflowsPageContainer))
