import React from 'react'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import AppContext from 'store'
import ASYNC_STATES from 'helpers/asyncStates'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'

function findLocations(subject) {
  if (!subject || !subject.locations) return null

  return subject.locations.map(location => {
    const keys = Object.keys(location)
    return location[keys[0]]
  })
}

function Editor () {
  const store = React.useContext(AppContext)
  const params = useParams()
  const subject = store.subject.current
  if (subject.id !== params.subject && store.subject.asyncState === ASYNC_STATES.IDLE) {
    store.subject.fetchSubject(params.subject)
  }
  const locations = findLocations(subject)

  return (
    <Box>
      <Box direction='row' gap='small' margin={{ horizontal: 'medium' }}>
        <SubjectViewer />
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
