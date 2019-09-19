import React, { Component } from 'react'
import TranscriptionTable from './TranscriptionTable'
import data from './mockData'

class TranscriptionTableContainer extends Component {
  constructor() {
    super();

    this.state = { data: null }
  }

  render () {
    return <TranscriptionTable data={data} />
  }
}

export default TranscriptionTableContainer
