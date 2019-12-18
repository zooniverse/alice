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
    const setResources = async () => {
      await store.getResources(match.params)
      await store.transcriptions.fetchTranscriptions()
      store.search.reset()
    }
    setResources()
    return () => store.modal.toggleModal('')
  }, [match, store])

  const onSelection = (subject) => {
    if (subject.locked) {
      store.modal.toggleModal(MODALS.LOCKED)
    }
    const nextPath = generatePath(EDIT_PATH, { subject: subject.id, ...match.params})
    history.push(nextPath)
    store.subjects.fetchSubject(subject.id)
  }

  const onSetPage = (page) => {
    store.transcriptions.fetchTranscriptions(page)
  }
  const steps = Array.from(Array(store.transcriptions.totalPages).keys())
  const transcriptions = Array.from(store.transcriptions.all.values())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        activeStep={store.transcriptions.page}
        columns={columns}
        data={transcriptions}
        error={store.transcriptions.error}
        onSelection={onSelection}
        resource='Subjects'
        searching={store.search.active}
        setStep={onSetPage}
        status={store.transcriptions.asyncState}
        state={store.transcriptions.asyncState}
        steps={steps}
      />
    </Box>
  )
}

export { SubjectsPageContainer }
export default withRouter(observer(SubjectsPageContainer))
