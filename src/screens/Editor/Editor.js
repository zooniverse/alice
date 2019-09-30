import React from 'react'
import { Box } from 'grommet'
import SubjectViewer from '../../components/SubjectViewer'
import FilmstripViewer from '../../components/FilmstripViewer'
import AggregatedTranscriptions from '../../components/AggregatedTranscriptions'

export default () => {
  return (
    <Box>
      <Box direction='row' gap='small' margin={{ horizontal: 'medium' }}>
        <SubjectViewer />
        <AggregatedTranscriptions />
      </Box>
      <Box margin={{ horizontal: 'medium', top: 'small' }}>
        <FilmstripViewer />
      </Box>
    </Box>
  )
}
