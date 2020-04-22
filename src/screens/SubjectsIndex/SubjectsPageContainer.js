import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { EDIT_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function SubjectsPageContainer ({ history, match }) {
  const store = React.useContext(AppContext)

  React.useEffect(() => {
    const setResources = async () => {
      await store.getResources(match.params)
      await store.transcriptions.fetchTranscriptions(store.transcriptions.page, false)
    }
    if (!(store.transcriptions.current && store.transcriptions.current.id)) {
      setResources()
    }
  }, [match, store])

  const onSelection = (transcription) => {
    const nextPath = generatePath(EDIT_PATH, { subject: transcription.id, ...match.params})
    history.push(nextPath)
  }

  const onSetPage = (page) => store.transcriptions.fetchTranscriptions(page)
  const steps = Array.from(Array(store.transcriptions.totalPages).keys())
  const transcriptions = Array.from(store.transcriptions.all.values())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        activeStep={store.transcriptions.page}
        columns={columns}
        data={transcriptions}
        error={store.transcriptions.error && store.transcriptions.error.message}
        onSelection={onSelection}
        resource='Subjects'
        searching={store.search.active}
        setStep={onSetPage}
        status={store.transcriptions.asyncState}
        steps={steps}
      />
    </Box>
  )
}

export { SubjectsPageContainer }
export default withRouter(observer(SubjectsPageContainer))
