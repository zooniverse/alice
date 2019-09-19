import React, { Component } from 'react'
import LineViewer from './LineViewer'
import mockLines from './mockLines'

const mockAggregatedText = 'Mauris elementum pulvinar lacinia. Donec tincidunt pretium quam, at condimentum ex lacinia eu.';

class LineViewerContainer extends Component {
  render () {
    return <LineViewer aggregatedText={mockAggregatedText} classifications={mockLines}/>
  }
}

export default LineViewerContainer
