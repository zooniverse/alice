import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import AppContext from 'store'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'

function Editor () {
  const store = React.useContext(AppContext)
  const params = useParams()
  const subject = store.subject.current
  const locations = store.subject.locations
  if (!subject && params.subject) {
    store.subject.fetchSubject(params.subject)
  }

  return (
    <Box>
      <Box direction='row' gap='small' margin={{ horizontal: 'medium' }}>
        <SubjectViewer subject={subject} />
        <AggregatedTranscriptions />
      </Box>
      <Box margin={{ horizontal: 'medium', top: 'small' }}>
        <FilmstripViewer images={locations} />
      </Box>
      <FilmstripViewer />
    </Box>
  )
}

export default observer(Editor)
