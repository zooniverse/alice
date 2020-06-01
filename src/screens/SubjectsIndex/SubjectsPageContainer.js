import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { generatePath, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { EDIT_PATH } from 'paths'
import ResourcesTable from '../../components/ResourcesTable'
import { columns } from './table'

function slicePages(page, pages) {
  const leftPage = page - 2 < 0 ? 0 : page - 2
  const rightPage = leftPage + 5
  if (pages.length > 5 && rightPage > pages.length - 1) {
    leftPage = pages.length - 5
    rightPage = pages.length
  }
  return pages.slice(leftPage, rightPage)
}

function SubjectsPageContainer ({ history, match }) {
  const store = React.useContext(AppContext)

  const { page, totalPages } = store.transcriptions

  const allPages = Array.from(Array(totalPages).keys())
  const [pages, setPages] = React.useState(allPages)

  React.useEffect(() => {
    const setResources = async () => {
      await store.getResources(match.params)
      await store.transcriptions.fetchTranscriptions(store.transcriptions.page, false)
    }
    setResources()
  }, [match, store])

  React.useEffect(() => setPages(slicePages(0, allPages)), [totalPages])

  const onSelection = (transcription) => {
    const nextPath = generatePath(EDIT_PATH, { subject: transcription.id, ...match.params})
    history.push(nextPath)
  }

  const onSetPage = (page) => {
    setPages(slicePages(page, allPages))
    store.transcriptions.fetchTranscriptions(page)
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
      />
    </Box>
  )
}

export { SubjectsPageContainer }
export default withRouter(observer(SubjectsPageContainer))
