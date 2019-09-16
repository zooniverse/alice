import React, { Component } from 'react'
import LineViewer from './LineViewer'
import mockLines from './mockLines'

class LineViewerContainer extends Component {
  render () {
    return <LineViewer classifications={mockLines}/>
  }
}

export default LineViewerContainer
