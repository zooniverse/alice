import { shallow } from 'enzyme'
import React from 'react'
import AnnotationsPaneContainer from './AnnotationsPaneContainer'

describe('Component > AnnotationsPaneContainer', function () {
  let wrapper

  const extract = {
    data: { frame0: {} }
  }
  const contextValues = {
    editor: {
      linesVisible: true
    },
    transcriptions: {
      activeSlope: 0,
      approved: false,
      currentTranscriptions: [{
        clusters_x: [],
        clusters_y: []
      }],
      index: 0,
      extracts: [extract]
    }
  }

  it('should render with transcriptions', function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation((context) => contextValues)
    wrapper = shallow(<AnnotationsPaneContainer />);
    expect(wrapper).toBeDefined()
  })

  it.skip('should render without transcriptions', function () {
    wrapper = shallow(<AnnotationsPaneContainer />);
  })
})
