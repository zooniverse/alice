import React, { Component } from 'react'
import ResourcesTable from './ResourcesTable'
import DATA from './mockData'
import COLUMNS from './mockColumns'

class ResourcesTableContainer extends Component {
  render () {
    return <ResourcesTable columns={COLUMNS} data={DATA} />
  }
}

export default ResourcesTableContainer
