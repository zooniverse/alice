import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { EDIT_PATH } from 'paths'
import MODALS from 'helpers/modals'
import ASYNC_STATES from 'helpers/asyncStates'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function SubjectsPageContainer (props) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    store.subjects.selectSubject(null)
  }, [store])

  if (store.transcriptions.asyncState === ASYNC_STATES.IDLE) {
    store.transcriptions.fetchTranscriptions()
  }
  const onSelection = (subject) => {
    if (subject.locked) {
      store.modal.toggleModal(MODALS.LOCKED)
    }
    const nextPath = generatePath(EDIT_PATH, { subject: subject.id, ...props.match.params})
    props.history.push(nextPath)
    store.subjects.fetchSubject(subject.id)
  }

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        columns={columns}
        data={store.transcriptions.all}
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
