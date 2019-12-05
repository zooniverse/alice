import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import { generatePath, withRouter } from 'react-router-dom'
import ASYNC_STATES from 'helpers/asyncStates'
import { SUBJECTS_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function SubjectSetPageContainer({ history, match }) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.projects.selectProject(match.params.project)
    store.workflows.selectWorkflow(match.params.workflow)
    store.groups.selectGroup(null)
  }, [match, store])

  const onSelection = group => {
    const nextPath = generatePath(SUBJECTS_PATH, { group: group.id, ...match.params})
    history.push(nextPath)
  }
  const groups = Array.from(store.groups.all.values())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={columns}
        data={groups}
        resource='groups'
        onSelection={onSelection}
        status={ASYNC_STATES.READY}
      />
    </Box>
  )
}

export { SubjectSetPageContainer }
export default withRouter(observer(SubjectSetPageContainer))
