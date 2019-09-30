import React, { Component } from 'react'
import { Box } from 'grommet'
import ResourcesTable from '../../components/ResourcesTable'
import COLUMNS from './mockWorkflowColumns'
import DATA from './mockWorkflowData'

export default class WorkflowPageContainer extends Component {
  render() {
    return (
      <Box margin='medium' fill='vertical'>
        <ResourcesTable columns={COLUMNS} data={DATA} />
      </Box>
    )
  }
}
