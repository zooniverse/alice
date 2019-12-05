import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { EDIT_PATH } from 'paths'
import MODALS from 'helpers/modals'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function SubjectsPageContainer ({ history, match }) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    const loadResources = async () => {
      await store.projects.selectProject(match.params.project)
      await store.workflows.selectWorkflow(match.params.workflow)
      await store.groups.selectGroup(match.params.group)
      await store.transcriptions.fetchTranscriptions()
      await store.subjects.selectSubject(null)
    }
    loadResources()
  }, [match, store])

  const onSelection = (subject) => {
    if (subject.locked) {
      store.modal.toggleModal(MODALS.LOCKED)
    }
    const nextPath = generatePath(EDIT_PATH, { subject: subject.id, ...match.params})
    history.push(nextPath)
    store.subjects.fetchSubject(subject.id)
  }

  const transcriptions = Array.from(store.transcriptions.all.values())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={columns}
        data={transcriptions}
        error={store.transcriptions.error}
        onSelection={onSelection}
        resource='Subjects'
        state={store.transcriptions.asyncState}
      />
    </Box>
  )
}

export { SubjectsPageContainer }
export default withRouter(observer(SubjectsPageContainer))
