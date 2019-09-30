import React, { Component } from 'react'
import { Box } from 'grommet'
import ResourcesTable from '../../components/ResourcesTable'
import { mockColumns, mockData } from './mock'

export default class SubjectSetPageContainer extends Component {
  render() {
    return (
      <Box margin='medium' fill='vertical'>
        <ResourcesTable columns={mockColumns} data={mockData} />
      </Box>
    )
  }
}
