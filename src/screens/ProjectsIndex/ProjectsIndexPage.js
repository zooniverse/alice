import React from 'react'
import { Box } from 'grommet'
import EditorHeader from '../../components/EditorHeader'
import ResourcesTable from '../../components/ResourcesTable'

export default () => (
  <Box margin='medium' fill='vertical'>
    <EditorHeader />
    <ResourcesTable />
  </Box>
)
