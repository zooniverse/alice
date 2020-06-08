import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { EDIT_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

const MAX_SHOWN_PAGES = 5

function slicePages(page, totalPages) {
  const allPages = Array.from(Array(totalPages).keys())
  let leftPage = page - 2 < 0 ? 0 : page - 2
  let rightPage = leftPage + MAX_SHOWN_PAGES
  if (totalPages > MAX_SHOWN_PAGES && rightPage > totalPages - 1) {
    leftPage = totalPages - MAX_SHOWN_PAGES
    rightPage = totalPages
  }
  return allPages.slice(leftPage, rightPage)
}

function SubjectsPageContainer ({ history, match }) {
  const store = React.useContext(AppContext)
  const { page, totalPages } = store.transcriptions
  const [pages, setPages] = React.useState([])

  React.useEffect(() => {
    const setResources = async () => {
      await store.getResources(match.params)
      await store.transcriptions.fetchTranscriptions(store.transcriptions.page, false)
    }
    setResources()
  }, [match, store])

  React.useEffect(() => setPages(slicePages(0, totalPages)), [totalPages])

  const onSelection = (transcription) => {
    const nextPath = generatePath(EDIT_PATH, { subject: transcription.id, ...match.params})
    history.push(nextPath)
  }

  const onSetPage = (page) => {
    store.transcriptions.fetchTranscriptions(page)
    setPages(slicePages(page, totalPages))
  }

  const transcriptions = Array.from(store.transcriptions.all.values())

  return (
    <Box margin='medium' fill='vertical'>
      <ResourcesTable
        activeStep={page}
        columns={columns}
        data={transcriptions}
        error={store.transcriptions.error && store.transcriptions.error.message}
        onSelection={onSelection}
        resource='Subjects'
        searching={store.search.active}
        setStep={onSetPage}
        status={store.transcriptions.asyncState}
        steps={pages}
        totalPages={totalPages}
      />
    </Box>
  )
}

export { SubjectsPageContainer }
export default withRouter(observer(SubjectsPageContainer))
