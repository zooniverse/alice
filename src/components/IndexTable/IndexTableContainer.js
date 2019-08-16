import React, { Component } from 'react'
import IndexTable from './IndexTable'
import DATA from './mockData'
import COLUMNS from './mockColumns'

class IndexTableContainer extends Component {
  render () {
    return <IndexTable columns={COLUMNS} data={DATA} />
  }
}

export default IndexTableContainer
