import React from 'react'
import { Box } from 'grommet'
import EditorHeader from '../../components/EditorHeader'
import ErrorNotifierContainer from './components/ErrorNotifierContainer'

export default () => {
  return (
    <Box margin={{ vertical: 'medium' }}>
      <Box margin={{ horizontal: 'medium' }} fill='vertical'>
        <EditorHeader />
      </Box>
      <ErrorNotifierContainer />
    </Box>
  )
}
