import React from 'react'
import { Box } from 'grommet'
import AppContext from 'store'
import { observer } from 'mobx-react'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'

function Editor() {
  const store = React.useContext(AppContext)
  const direction = store.classifier.layout

  return (
    <Box>
      <Box direction={direction} gap='small' margin={{ horizontal: 'medium' }}>
        <Box basis='1/2'>
          <SubjectViewer />
        </Box>
        <Box basis='1/2'>
          <AggregatedTranscriptions />
        </Box>
      </Box>
      <Box margin={{ horizontal: 'medium', top: 'small' }}>
        <FilmstripViewer />
      </Box>
    </Box>
  )
}

export default observer(Editor)
